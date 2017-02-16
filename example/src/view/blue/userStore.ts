import { update as copy } from 'immupdate'
import Store, { Store as StoreType } from 'kaiju/store'
import { Message } from 'kaiju'

import observeAjax from 'util/ajax'
import { RemoteData, NotAsked, Success, Refreshing } from 'util/remoteData'
import * as promise from 'util/promise'


export const loadNextUserPage = Message('loadNextUserPage')
export const reloadUsers = Message('reloadUsers')


export interface Users {
  users: RemoteData<string[], {}>
  pagination: {
    hasMore: boolean,
    loadMore: typeof loadNextUserPage
  }
}

export type UserStore = StoreType<Users>

export function UserStore(initId: string) {

  const initState = {
    users: NotAsked,
    pagination: {
      hasMore: true,
      loadMore: loadNextUserPage
    }
  }

  return Store<Users>(initState, on => {
    const initialUsers = initialUserData()
    const nextUserPage = pagedUserData()

    on(initialUsers.data, (state, data) => {
      const pagination = copy(initState.pagination, {
        hasMore: data.type === 'success'
      })

      return copy(state, {
        users: data,
        pagination
      })
    })

    on(reloadUsers, () => initialUsers.call())

    // We could also write an abstraction that merges the initial + paged data Observables
    on(nextUserPage.data, (state, newPage) => {
      if (state.users.type !== 'success' &&
          state.users.type !== 'refreshing') return

      if (newPage.type === 'success') {
        const newUsers = state.users.data.concat(newPage.data)
        const newPagination = copy(initState.pagination, { hasMore: newUsers.length < 100 })

        return copy(state, {
          users: Success(newUsers),
          pagination: newPagination
        })
      }
      else if (newPage.type === 'loading') {
        return copy(state, { users: Refreshing(state.users.data) })
      }
    })

    on(loadNextUserPage, () => nextUserPage.call())

  }, { name: 'userStore' })
}


type User = { name: { first: string, last: string } }

function getUsers() {
  return promise.delay(2000)
    .then(_ => fetch('https://randomuser.me/api/?results=20')
    .then(res => res.json())
    .then(json => (json.results as User[]).map(user =>
      `${user.name.first} ${user.name.last}`)
    ))
}

function initialUserData() {
  return observeAjax({
    name: 'initialUsers',
    ajax: getUsers,
    callNow: true
  })
}

function pagedUserData() {
  return observeAjax({
    name: 'pagedUsers',
    ajax: getUsers
  })
}
