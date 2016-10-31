import { NoArgMessage, Messages } from 'kaiju'
import observeAjax from '../../util/ajax'
import * as promise from '../../util/promise'


export function getUserData<P>(msg: Messages, trigger: NoArgMessage) {
  function userDataAjax() {
    interface User {
      name: { first: string, last: string }
    }

    return promise.delay(2000).then(x => fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(json => (json.results as Array<User>).map(user =>
        `${user.name.first} ${user.name.last}`)
      ))
  }

  return observeAjax({
    name: 'users',
    callNowWith: undefined,
    trigger: msg.listen(trigger),
    ajax: userDataAjax
  })
}
