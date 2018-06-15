
import { Observable } from './observable';

export default function pure(value) {
  return Observable(function (add) {
    return add(value);
  }).named('pure');
}