

function _instanceof(object, constructor) {
  if (typeof constructor !== 'function') throw new Error(`Right-hand side of '_instanceof' is not callable`)
  if (typeof object !== 'object' || object === null) return false; // 基础类型 均为 false 
  let _proto = null
  while (_proto = Object.getPrototypeOf(object)) {
    if (_proto === constructor.prototype) return true
  }
  return false
}

var object = { name: 'test'}
function fn() {}
fn.prototype = object;
var context = Object.create(object)

context instanceof fn
