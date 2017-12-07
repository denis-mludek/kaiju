import { update } from 'space-lift'
import { array, object, string } from 'validation.ts'
import { Store } from 'kaiju'

import { ajax, observeAjax } from 'common/util//ajax'
import { RemoteData, NotAsked } from 'common/util/remoteData'


export type UserState = { users: RemoteData<string[], {}> }
export type UserStore = Store<UserState>

const initState = {
  users: NotAsked
}

export default function() {
  const getUsers = observeGetUsers()

  return Store<UserState>(initState, ({ on, state }) => {

    on(getUsers.data, users => {
      return update(state(), { users })
    })

  })
}


const userValidator = object({
  name: object({
    first: string,
    last: string
  })
})

const usersValidator = object({
  results: array(userValidator.map(u => `${u.name.first} ${u.name.last}`))
}).map(obj => obj.results)

function observeGetUsers() {
  return observeAjax({
    name: 'users',
    ajax: () => ajax({ method: 'GET', url: 'https://randomuser.me/api/?results=20', validator: usersValidator }),
    callNow: true
  })
}