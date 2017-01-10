import update from 'immupdate'
import Store, { Store as StoreType } from 'kaiju/store'
import { Message } from 'kaiju'
import observeAjax from 'util/ajax'
import * as promise from 'util/promise'


export const reloadUsers = Message('reloadUsers')


export interface Users {
  list: Array<string>
  loading: boolean
}

export type UserStore = StoreType<Users>

export function UserStore(initId: string) {

  const initState = { list: [], loading: false }

  return Store<Users>(initState, on => {
    const users = getUserData()

    on(users.data, (state, list) => update(state, { list }))
    on(users.error, (state, err) => update(state, { list: [] }))
    on(users.loading, (state, loading) => update(state, { loading }))
    on(reloadUsers, () => users.call(undefined))

  }, { name: 'userStore' })
}


export function getUserData() {

  function getUsers() {
    interface User {
      name: { first: string, last: string }
    }

    return promise.delay(2000).then(_ => fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(json => (json.results as Array<User>).map(user =>
        `${user.name.first} ${user.name.last}`)
      ))
  }

  return observeAjax({
    name: 'users',
    callNowWith: undefined,
    ajax: getUsers
  })
}
