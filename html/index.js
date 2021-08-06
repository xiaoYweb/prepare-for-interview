// "use strict";

// console.log('this', this) // 浏览器环境 window  node 环境 {}
function fn() {
  console.log('fn this', this) // 严格模式 undefined 非严格模式 window global globalThis
}
// fn()  
var obj = {
  fn: function fn(a) {
    console.log('fn', a)
  },
  // fn(a) {
  //   console.log('fn', a)
  // },
  func: (...args) => {
    func.log('fn', args)
  }
}
var copyObj = {}
function func(object) {
  for (const key in object) {
    const element = object[key];
    if (typeof element === 'function') {
      
      const str = element.toString();
      console.log('--', str)
      copyObj[key] = eval(str)
    }
  }
}
func(obj)
// eval("copyObj.fn = (a) => {console.log(a)}")