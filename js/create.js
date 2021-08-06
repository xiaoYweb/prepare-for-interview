function create(obj) {
  function Fn() {}
  Fn.prototype = obj;
  const instance = new Fn()
  return instance;
}

Object._create = create;

const obj = Object.create(null)
