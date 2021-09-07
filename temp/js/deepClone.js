function deepClone(val, mp = new WeakMap) {
  const typeofVal = typeof val
  if (typeofVal === 'function') {
    return cloneFunction(val)
  }
  if (val === null) return null
  if (typeofVal === 'symbol') { // 单独处理 symbol 类型的值
    return Symbol(val.description)
  }
  if (typeofVal !== 'object') return val
  if (val instanceof Date) {
    return new Date(val)
  }
  if (val instanceof RegExp) {
    return cloneReg(val)
  }
  if (mp.get(val)) {
    return mp.get(val)
  }

  const result = new val.constructor

  if (val instanceof Set) {
    val.forEach(item => {
      result.add(deepClone(item))
    })
  } else if (val instanceof Map) {
    val.forEach((key, val) => {
      result.set(key, deepClone(val))
    })
  } else if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      const item = val[i];
      result[i] = deepClone(item, mp)
    }
  } else {
    Object.keys(val).forEach(key => {
      result[key] = deepClone(val[key], mp)
    })
  }

  mp.set(val, result)

  return result
}

function cloneReg(reg) {
  const re = /\w*$/
  const result = new RegExp(reg.source, res.exec(re))
  result.lastIndex = reg.lastIndex
  return result
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        console.log('匹配到参数：', paramArr);
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
      console.log('code秘密花园');
  },
  func2: function (a, b) {
      return a + b;
  }
};

console.log(deepClone(target))