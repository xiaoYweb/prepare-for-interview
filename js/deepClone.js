// 手写一个深拷贝函数，最好能处理循环引用和Date、Reg的

function deepClone(val, mp = new WeakMap()) {
  if (val === null) return val;

  const typeofVal = typeof val;

  if (typeofVal === 'symbol') { // 单独处理 symbol 类型的值
    return cloneSymbol(val.description)
  }
  if (typeofVal === 'function') { // 单独处理 function 类型的值
    return cloneFunction(val)
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

  if (mp.get(val)) return mp.get(val)

  const result = new val.constructor();

  if (val instanceof Map) {
    val.forEach((key, value) => {
      result.set(key, deepClone(value))
    })
  } else if (val instanceof Set) {
    val.forEach(item => {
      result.add(item)
    })
  } else if (Array.isArray(val)) { // 数组
    for (let i = 0; i < val.length; i++) {
      const element = val[i];
      result[i] = deepClone(element)
    }
  } else { // plain object
    for (const key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        const element = val[key];
        result[key] = deepClone(element)
      }
    }
  }

  mp.set(val, result);

  return result;
}
function isOtherType(val) {
  if (val === null) return true
  const type = typeof val;
  if (type !== 'object' && type !== 'symbol' && type !== 'function') return true

}

function cloneSymbol(origin) {
  return Symbol(origin.description)
}
function cloneReg(reg) {
  const reFlags = /\w*$/
  const result = new RegExp(reg.origin, reg.exec(reFlags))
  result.lastIndex = reg.lastIndex;
  return result;
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

function test() {
  const map = new Map();
  map.set('key', 'value');
  map.set('ConardLi', 'code秘密花园');

  const set = new Set();
  set.add('ConardLi');
  set.add('code秘密花园');
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
}

test()