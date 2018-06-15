
import { Observable } from './observable';

var UNSET = {};

export default function distinct(compareFunction, source) {
  var previousValue = UNSET;

  return Observable(function (add) {
    return source.subscribe(function (val, name) {
      var shouldAdd = previousValue === UNSET || (compareFunction ? compareFunction(val, previousValue) === false : val !== previousValue);

      previousValue = val;
      if (shouldAdd) add(val, name);
    });
  });
}