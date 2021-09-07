function create(obj) {
  if (obj === undefined) throw new Error('Object prototype may only be an Object or null: undefined')
  function Fn() {}
  Fn.prototype = obj;
  const instance = new Fn()
  return instance;
}

Object._create = create;

const obj = Object.create(null)
