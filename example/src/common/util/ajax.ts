/* tslint:disable:no-any */

import { Result, Ok, Err } from 'space-lift'
import { Observable } from 'kaiju'
import { Validator, errorDebugString, ValidationError } from 'validation.ts'

import { RemoteData, NotAsked, Loading, Success, Failure } from 'common/util/remoteData'


//--------------------------------------
//  ajax
//--------------------------------------

interface AjaxOptions<V> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION' | 'PATCH'
  url: string
  body?: Object | FormData
  validator: Validator<V>
  headers?: Record<string, string>
  onProgress?: (evt: ProgressEvent) => void
}

type AjaxError =
  { type: 'networkError' } |
  { type: 'aborted' } |
  { type: 'badPayload', payload: {}, validationErrors: ValidationError[] } |
  { type: 'badResponse', code: number, response: string } |
  { type: 'technicalError', error: Error }


type AjaxResult<V> = Result<AjaxError, V>
type AjaxPromise<V> = Promise<AjaxResult<V>> & { xhr: XMLHttpRequest }

/*
 * Wraps a XMLHttpRequest and return a Promise of Result.
 * The returned Promise can never fail (promise error handling is a pain).
 *
 * The underlying XMLHttpRequest is also passed in the result to perform low level manipulation (e.g getResponseHeader(), etc)
 */
export function ajax<V>(options: AjaxOptions<V>): AjaxPromise<V> { // & { xhr: XMLHttpRequest }
  const { method, url, body, validator, headers = {}, onProgress } = options

  const isFormData = body instanceof FormData
  let jsonBody: string

  if (body !== undefined && !isFormData) {
    if (!('Content-Type' in headers)) headers['Content-Type'] = 'application/json'
    if (headers['Content-Type'] === 'application/json') jsonBody = JSON.stringify(body)
  }

  if (!headers['Accept']) headers['Accept'] = 'application/json'

  const xhr = new XMLHttpRequest()

  const promise = new Promise<AjaxResult<V>>(resolve => {
    if (onProgress)
      xhr.upload.addEventListener('progress', onProgress)

    const abortXhr = xhr.abort
    // Intercept the abortion as there is no way to tell from onreadystatechange:
    // Both a network error and an abort() would result in a status of 0.
    xhr.abort = function() {
      xhr.onreadystatechange = null!
      abortXhr()
      resolve(Err<AjaxError>({ type: 'aborted' }))
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return

      // IE can throw an error when accessing the status
      let status = 0
      try { status = xhr.status }
      catch (e) {}

      if (status === 0)
        return resolve(Err<AjaxError>({ type: 'networkError' }))

      if (!isOkStatus(status))
        return resolve(Err<AjaxError>({ type: 'badResponse', code: status, response: xhr.responseText }))

      let responseBody
      try { responseBody = JSON.parse(xhr.responseText) }
      catch (e) { return resolve(Err<AjaxError>({
        type: 'badPayload',
        payload: xhr.responseText,
        validationErrors: []
      })) }

      const validated = validator.validate(responseBody)

      if (validated.isOk())
        resolve(validated as Ok<never, V>)
      else
        resolve(Err<AjaxError>({
          type: 'badPayload',
          payload: responseBody,
          validationErrors: validated.get()
        }))
    }

    xhr.open(method, url, true)

    Object.keys(headers).forEach(name => xhr.setRequestHeader(name, headers[name]))

    if (isFormData) xhr.send(body)
    else if (jsonBody !== undefined) xhr.send(jsonBody)
    else xhr.send()
  })
  .catch(error => Err<AjaxError>({ type: 'technicalError', error }))

  if (env.isDev) {
    promise.then(value => {
      if (value.isOk()) return

      const error = value.get()

      switch (error.type) {
        case 'networkError':   return console.error('Network error')
        case 'aborted':        return console.warn('Aborted ajax request')
        case 'badPayload':     return console.error(error, `\n${errorDebugString(error.validationErrors)}`)
        case 'badResponse':    return console.error(error)
        case 'technicalError': return console.error('???')
      }
    })
  }

  return Object.assign(promise, { xhr })
}

function isOkStatus(s: number) {
  return s >= 200 && s < 300 || s === 303 || s === 304
}


//--------------------------------------
//  observeAjax
//--------------------------------------

interface ObserveAjaxOptions<I, O> {
  /** name for logging purposes: This will be the debug name of the Observable */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: (input: I) => AjaxPromise<O>

  /** If this property is specified, the ajax function will be called immediately with its value */
  callNowWith?: I
}

interface ObserveAjaxNoArgOptions<O> {
  /** name for logging purposes: This will be the debug name of the Observable */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: () => AjaxPromise<O>

  /** If this property is specified, the ajax function will be called immediately */
  callNow?: true
}


interface ObserveAjaxNoArgHandle<O, E> {
  data: Observable<RemoteData<O, E>>

  /* Make an ajax call again */
  call(): void
}

interface ObserveAjaxHandle<I, O, E> {
  data: Observable<RemoteData<O, E>>

  /* Make an ajax call again */
  call(value: I): void
}


export function observeAjax<O, E>(options: ObserveAjaxNoArgOptions<O>): ObserveAjaxNoArgHandle<O, E>
export function observeAjax<I, O, E>(options: ObserveAjaxOptions<I, O>): ObserveAjaxHandle<I, O, E>
/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call.
 */
export function observeAjax<I, O>(options: (ObserveAjaxNoArgOptions<O> | ObserveAjaxOptions<I, O>)): any {
  const { name } = options
  const ajax = options.ajax as (input: I) => AjaxPromise<O>
  const dynamicOptions = options as any

  const call = Observable<I>()
  const hasCallNowWith = ('callNowWith' in options) || ('callNow' in options)

  const trigger = hasCallNowWith
    ? Observable.merge(call, Observable.pure(dynamicOptions.callNowWith as {} as I))
    : call

  const result = trigger.flatMapLatest(arg =>
    Observable.fromPromise(ajax(arg))).map(promiseResult => {
      // Unwrap the Promise's Result: It is safe because a Promise from ajax() can never fail.
      const ajaxResult = promiseResult.get() as {} as AjaxResult<O>
      return ajaxResult.fold(Failure, Success)
    })

  const loading = trigger.map(_ => Loading)

  const notAsked = hasCallNowWith ? Observable() : Observable.pure(NotAsked)

  const data = Observable.merge(notAsked, loading, result)

  return {
    data: data.named(name + '_remoteData'),
    // We want call() to return undefined so it can be used inside Store handler one liners.
    call(value: I) { call(value) }
  }
}
