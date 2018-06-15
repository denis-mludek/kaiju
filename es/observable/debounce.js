
import { Observable } from './observable';

export default function debounce(wait, source) {
  return Observable(function (add) {
    var debouncedAdd = debounceFunction(wait, add);
    var unsubscribe = source.subscribe(debouncedAdd);

    return function () {
      unsubscribe();
      debouncedAdd.cancel();
    };
  });
}

export function debounceFunction(wait, func) {
  var timeout = void 0;

  var debounced = function debounced() {
    var args = arguments;

    var later = function later() {
      timeout = undefined;
      func.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = function () {
    return clearTimeout(timeout);
  };
  return debounced;
}