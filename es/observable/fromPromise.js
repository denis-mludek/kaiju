import { Observable } from './observable';
import { Ok, Err } from 'space-lift';

export default function fromPromise(promise) {
  return Observable(function (add) {
    var active = true;

    promise.then(function (value) {
      if (active) add(Ok(value));
    }, function (error) {
      if (active) add(Err(error));
    });

    return function () {
      active = false;
    };
  }).named('fromPromise');
}