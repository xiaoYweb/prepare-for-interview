// 手写一个深拷贝函数，最好能处理循环引用和Date、Reg的

function deepClone(val, mp = new WeakMap()) {
  if (val === null) return val;
  const typeofVal = typeof val;
  if (mp.get()) return mp.get()

  if (typeofVal === 'symbol') { // 单独处理 symbol 类型的值
    return cloneSymbol(val)
  }
  if (typeofVal === 'function') { // 单独处理 function 类型的值
    return val
  }
  if (typeofVal !== 'object') { // 处理其他 非对象 类型的值
    return val
  }
  if (val instanceof Date) { // 日期对象
    return new Date(val)
  }
  if (val instanceof RegExp) { // 正则对象
    return cloneReg(val)
  }

  const result = new val.constructor();


  if (Array.isArray(val)) { // 数组
    for (let i = 0; i < val.length; i++) {
      const element = val[i];
      result[i] = deepClone(element)
    }
    return result
  }

  // plain object
  for (const key in val) {
    if (Object.hasOwnProperty.call(val, key)) {
      const element = val[key];
      result[key] = deepClone(element)
    }
  }

  map.set(val, result);

  return result;
}
function isOtherType(val) {
  if (val === null) return true
  const type = typeof val;
  if (type !== 'object' && type !== 'symbol' && type !== 'function') return true

}
function cloneSymbol(origin) {
  return Symbol(origin.description)
  // return Object(Symbol.prototype.valueOf.call(origin));
}
function cloneReg(origin) {
  const reFlags = /\w*$/;
  const result = new origin.constructor(origin.source, reFlags.exec(origin));
  result.lastIndex = origin.lastIndex;
  return result;
}

function shallowClone(obj) {
  return Object.assign({}, obj)
}