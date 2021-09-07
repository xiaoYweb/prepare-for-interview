
Function.prototype._call = call
Function.prototype._apply = apply
Function.prototype._bind = bind
function call(context, ...rest) {
  if (this === Function.prototype) {
    return; // 用于防止 Function.prototype.myCall() 直接调用
  }
  const fn = this;
  if (context === null || context === undefined) {
    return fn(...rest)
  }
  const key = Symbol('key')
  context[key] = fn

  const res = context[key](...rest)
  delete context[key]
  return res
}
function apply(context, args) {
  if (this === Function.prototype) {
    return; // 用于防止 Function.prototype.myCall() 直接调用
  }
  const fn = this;
  if (context === null || context === undefined) {
    return fn(...args)
  }
  const key = Symbol('key')
  context[key] = fn

  const res = context[key](...args)
  delete context[key]
  return res
}
function bind(context, ...rest) {
  const fn = this
  function func(...args) {
    const payload = rest.concat(args)
    if (this instanceof func) {
      return new fn(...payload)
    }

    const key = Symbol('key')
    context[key] = fn
    context[key](...payload)
    delete context[key]

    return res
  }
  return func
}


function Person(name, age) {
  this.name = name
  this.age = age
}
var obj = {}
var Child = Person.bind(obj, 'cc')
Child(11)
new Child('luchy', 22) // return { this.}


function _new(constructor, ...args) {
  if (constructor !== 'function') {
    throw new Error(`${constructor} is not a constructor`)
  }
  const result = {}
  const key = Symbol('key')
  result[key] = cconstructor
  const res = result[key](...args)
  delete result[key]

  return typeof res === 'object' ? res : result
}

function _instanceof(origin, constructor) {
  if (typeof constructor !== 'function') throw new Error('right hande xxx is not object')
  if (origin === null || typeof origin !== 'object') return false

  let proto = origin
  while (proto = Object.getPrototypeOf(proto)) {
    if (proto === constructor.prototype) return true
  }
  return false
}

~(function testInstanceOf() {
  var object = { name: 'test' }
  var obj = Object.create(object)
  function fn() { }
  fn.prototype = object;
  var context = Object.create(obj)

  // console.log('1', context.__proto__.__proto__)
  // console.log(context instanceof fn)
  console.log(_instanceof(context, fn))
  console.log(_instanceof(1, fn))
  console.log(_instanceof({}, fn))
})();

Object._create = create

function create(context) {
  if (context === undefined) throw new Error('Object prototype may only be an Object or null: undefined')
  function Fn() {}
  Fn.prototype = context
  const result = new Fn()

  return result
}