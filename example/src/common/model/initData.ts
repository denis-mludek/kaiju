
/**
 * Data immediately made available by the server.
 * Do not use it with heavy payloads.
 * Remember that adding a lof of things here will delay the first paint.
 */
export interface InitData {
  helloWorld: string
}

let _initData: InitData

export function initData(): InitData {
  return _initData || (_initData = JSON.parse(
    (document.getElementById('init-data') as HTMLScriptElement).getAttribute('data') || ''
  ))
}