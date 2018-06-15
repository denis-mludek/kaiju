
import { Observable } from './observable';

export default function interval(time) {
  return Observable(function (add) {
    var intervalId = setInterval(add, time);
    return function () {
      return clearInterval(intervalId);
    };
  }).named('interval');
}