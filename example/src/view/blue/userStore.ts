import { update } from 'immupdate'
import Store, { Store as StoreType } from 'kaiju/store'
import { Message } from 'kaiju'

import observeAjax from 'util/ajax'
import { RemoteData, NotAsked } from 'util/remoteData'
import * as promise from 'util/promise'


export const reloadUsers = Message('reloadUsers')


export interface Users {
  users: RemoteData<string[], {}>
}

export type UserStore = StoreType<Users>

export function UserStore(initId: string) {

  const initState = { users: NotAsked }

  return Store<Users>(initState, on => {
    const users = getUserData()

    on(users.data, (state, data) => update(state, { users: data }))

    on(reloadUsers, () => users.call(undefined))

  }, { name: 'userStore' })
}


export function getUserData() {

  type User = { name: { first: string, last: string } }

  function getUsers() {
    return promise.delay(2000).then(_ => fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(json => (json.results as User[]).map(user =>
        `${user.name.first} ${user.name.last}`)
      ))
  }

  return observeAjax({
    name: 'users',
    callNowWith: undefined,
    ajax: getUsers
  })
}
