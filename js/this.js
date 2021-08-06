// this 指向问题
/**
 * 1. 默认绑定 
 * 1.1 非严格模式下 最外层 默认指向 window {}  函数内部 默认指向 window global globalThis
 * 1.2 严格模式下 最外层 默认指向 window {}  函数内部 默认指向 undefined
 * 2. 隐式绑定 对象调用执行 则 默认指向 调用的对象 
 * 3. 显示绑定 bind call apply
 * 4. new 构造函数调用 若没有返回 默认创建对象 this指向该对象 
 */

function fn(){
  this.name = 'timy'
  console.log('this', this)
  return {}
}