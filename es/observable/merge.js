
import { Observable } from './observable';

export default function merge() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return Observable(function (add) {
    var unsubs = sources.map(function (obs) {
      return obs.subscribe(add);
    });
    return function () {
      return unsubs.forEach(function (unsub) {
        return unsub();
      });
    };
  });
}