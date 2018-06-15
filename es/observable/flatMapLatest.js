
import { Observable } from './observable';

export default function flatMapLatest(mapper, source) {
  return Observable(function (add) {
    var currentUnsub = void 0;

    var unsubSource = source.subscribe(function (val) {
      currentUnsub && currentUnsub();
      var mappedObs = mapper(val);
      currentUnsub = mappedObs.subscribe(add);
    });

    return function () {
      currentUnsub && currentUnsub();
      unsubSource();
    };
  });
}