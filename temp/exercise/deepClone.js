

function deepClone(val, mp = new WeakMap()) {
  if (typeof val === null) return val
  if (typeof val === 'function') return ''
  if (typeof val === 'symbol') {
    return Symbol.prototype.valueOf.call(sy)
  }
  if (typeof val !== 'object') return val
  if (val instanceof RegExp) {
    return new RegExp(val)
  }
  if (val instanceof Date) {
    return new Date(val)
  }
  const cacheData = mp.get(val)
  if (cacheData) return cacheData
  let result = new val.constructor()
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      const item = val[i];
      result.push(deepClone(item))
    }
  } else {
    for (const key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        const item = val[key];
        result[key] = deepClone(item);
      }
    }
  }

  mp.set(val, result)
  
  return result;
}