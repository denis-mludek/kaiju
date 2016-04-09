

export function Set() {
  let set = {};
  for (let i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1;
  }
  return set;
};
