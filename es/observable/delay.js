
import { Observable } from './observable';

export default function delay(delayValue, source) {
  return Observable(function (add) {
    var currentTimeouts = [];

    var unsubSource = source.subscribe(function (val, name) {

      var timeout = setTimeout(function () {
        var index = currentTimeouts.indexOf(timeout);
        currentTimeouts.splice(index, 1);
        add(val, name);
      }, delayValue);

      currentTimeouts.push(timeout);
    });

    return function () {
      currentTimeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      unsubSource();
    };
  });
}