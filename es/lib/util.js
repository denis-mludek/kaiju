
export function Set() {
  var set = {};
  for (var i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1;
  }
  return set;
}

/* An optimized Object.assign */
export function assign(t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) {
      t[p] = s[p];
    }
  }
  return t;
}

/* Efficient shallow comparison of two objects */
export function shallowEqual(objA, objB) {
  if (objA === objB) return true;

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return;

  // Test for A's keys different from B's.
  for (var i = 0; i < keysA.length; i++) {
    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB) {
      if (valA && valA.type === 'partiallyAppliedMessage') {
        // A partially applied message will always have a new reference,
        // so compare the references of the payloads instead.
        // It is assumed Messages are stable for a given key.
        if (valA.payload !== valB.payload) return false;
      } else return false;
    }
  }

  return true;
}