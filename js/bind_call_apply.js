/**
 * 1. 处理参数，返回一个闭包
 * 2. 判断是否为构造函数调用，如果是则使用new调用当前函数
 * 3. 如果不是，使用apply，将context和处理好的参数传入
 */

Function.prototype._bind = bind;
function bind(context, ...args1) {
  const fn = this;
  function Func(...args2) {
    const payload = [...args1, ...args2]
    if (this instanceof Func) {
      return new fn(...payload)
    }
    return fn.apply(context, payload)
  }
  return Func;
}
/**
  1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
  2.context 为 null undefined bigint 类型 则 默认指向window 若为 string numbel boolean symbol  类型 则默认指向对应的实例 其他情况为对象类型 则默认指向对象类型的
  3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
  4.处理参数，传入第一个参数后的其余参数 调用函数后即删除该Symbol属性 返回 执行结果
 */
Function.prototype._call = call;
function call(context, ...args) {
  if (this === Function.prototype) {
    return; // 用于防止 Function.prototype.myCall() 直接调用
  }
  if (context === null || context === undefined || typeof context === 'bigint') { // null undefined 默认指向window
    context = window
  } else if (typeof context !== 'object') { // string numbel boolean symbol 
    context = new context.constructor;
  }
  const fn = Symbol.for('fn')
  context[fn] = this;
  const result = context[fn](...args)
  delete context[fn]
  return result;
}

Function.prototype._apply = apply;
function apply(context, args) {
  if (this === Function.prototype) {
    return; // 用于防止 Function.prototype.myCall() 直接调用
  }
  if (context === null || context === undefined || typeof context === 'bigint') { // null undefined 默认指向window
    context = window
  } else if (typeof context !== 'object') { // string numbel boolean symbol 
    context = new context.constructor;
  }
  const fn = Symbol.for('fn')
  context[fn] = this;

  // apply 第二个参数必须为数组 不然 参数无效 
  const result = Array.isArray(args)
    ? context[fn](...args)
    : context[fn]()

  delete context[fn]
  return result;
}