

function _instanceof(object, constructor) {
  if (typeof constructor !== 'function') throw new Error(`Right-hand side of '_instanceof' is not callable`)
  if (typeof object !== 'object' || object === null) return false; // 基础类型 均为 false 
  let _proto = object
  while (_proto = Object.getPrototypeOf(_proto)) {
    if (_proto === constructor.prototype) return true
  }
  return false
}


var object = { name: 'test'}
var obj = Object.create(object)
function fn() {}
fn.prototype = object;
var context = Object.create(obj)

console.log('1',context.__proto__.__proto__)
// console.log(context instanceof fn)
console.log(_instanceof(context, fn))
console.log(_instanceof(1, fn))
console.log(_instanceof({}, fn))
