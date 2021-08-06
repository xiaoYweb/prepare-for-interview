function sum(arr) {
  return new Promise((resolve) => {
    const len = arr.length;
    if (len === 0) return resolve(0);
    if (len === 1) return resolve(arr[0])
    if (len === 2) return resolve(debounceAdd(arr[0], arr[1]))
    const n = Math.floor(len / 2)
    const prev = arr.slice(0, n);
    const next = arr.slice(n);
    const prevSumPromise = sum(prev)
    const nextSumPromise = sum(next)
    Promise.all([prevSumPromise, nextSumPromise]).then(([a, b]) => {
      resolve(debounceAdd(a, b))
    })
  })
}

let max = 3;
function debounceAdd(a, b) {
  if (max <= 0) {
    return sleep().then(() => {
      return debounceAdd(a, b)
    })
  }
  max--
  return new Promise((resolve) => {
    resolve(add(a, b))
  }).then((res) => {
    max++
    return res;
  })
}

function sleep(wait = 100) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, wait);
  })
}

function add(a, b) {
  console.log('max', max)
  // return a + b
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b)
    }, 3000);
  })
  return Promise.resolve(a + b)
}

// sum([1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14]).then(sum => {
//   console.log('sum', sum)
// })


var a = {
  n: 0,
  valueOf() {
    return {}
    return ++this.n
  },
  toString() {
    return ++this.n
  }
}
var b = [1, 2, 3]
// b.valueOf = b.shift
b.toString = b.shift

function fn(a) {
  if (a == 1 && a == 2 && a == 3) {
    console.log('---')
  }
}
// fn(b)

var c = {
  valueOf() {
    console.log('valueOf')
  },
  toString() {
    console.log('valueOf')
  },
  // [Symbol.toPrimitive]() { // 对象转换为初始值时调用 优先级最高
  //   
  // }
  [Symbol.toPrimitive]: ((i) => () => ++i)(0)
}
// console.log('1 + c', 1 + c)
// fn(c)

Number.prototype.add = function (val) {
  return this + val
}


class CreateLazyMan {
  constructor(name) {
    this.name = name;
    this.taskList = []
    this.sayHello()
    this.init()
  }
  sayHello() {
    console.log(`Hi I am ${this.name}`)
  }
  sleep(wait = 0) {
    this.taskList.push(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${wait}秒...`)
          resolve()
        }, wait * 100);
      })
    })
    return this;
  }
  eat(sth) {
    this.taskList.push(() => {
      console.log(`I am eating ${sth}`)
      return Promise.resolve()
    })
    return this;
  }
  sleepFirst(wait = 0) { // 任务开始执行前需要 等待的时间
    this.taskList.unshift(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${wait}秒...`)
          resolve()
        }, wait * 100);
      })
    })
    return this;
  }
  exec() {
    const task = this.taskList.shift();
    task && task().then(() => this.exec())
  }
  init() {
    setTimeout(() => {
      this.exec()
    }, 100);
  }
}

function LazyMan(name) {
  return new CreateLazyMan(name)
}
// LazyMan('Tony');
// LazyMan('Tony').sleep(10).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');

// 59  [1,2,2,3,4]  [2,5,6,2]  --> [2,2]
function fn59(arr1, arr2) {
  const mp = {}
  const result = []
  arr1.forEach((key, i) => {
    mp[key] = (mp[key] || (mp[key] = 0)) + 1
  })
  arr2.forEach(key => {
    const val = mp[key];
    if (!val) return
    mp[key] = val - 1
    result.push(key)
  })
  console.log('result', result)
  return result;
}
// fn59([1, 2, 2, 3, 4], [2, 5, 6, 2, 4])

// [2, 10, 3, 4, 5, 11, 10, 11, 20] -> [[2, 3, 4, 5], [10, 11], [20]]
function fn67(list) {
  const unique = list => [...new Set(list)]
  const mp = {}
  list.forEach(val => {
    const n = Math.floor(val / 10)
    const list = mp[n] || (mp[n] = [])
    list.push(val)
  })
  const result = Object.values(mp).map(item => unique(item))
  console.log('result', result)
  return result;
}
// fn67([2, 10, 3, 4, 5, 11, 10, 11, 20])

// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
function fn69(str) {
  return str.replace(/[A-z]/g, (val) => {
    return /[a-z]/.test(val)
      ? val.toUpperCase()
      : val.toLowerCase()
  })
}
// console.log('fn69', fn69('aBc'))

/**
  输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
  输出: [5, 6, 7, 1, 2, 3, 4]
  解释:
  向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
  向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
  向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
 */
function fn77(arr, k = 0) {
  const len = arr.length;
  const n = len - k % len;
  const prevArr = arr.slice(0, n)
  const nextArr = arr.slice(n)
  const result = nextArr.concat(prevArr);
  console.log('result', result)
  return result;
}
// fn77([1, 2, 3, 4, 5, 6, 7],1) 

// 打印出 1 - 10000 之间的所有对称数 例如：121、1331 等
function fn81() {
  const isOk = num => {
    const val = num.toString();
    return val === val.split('').reverse().join('')
  }
  const result = []
  for (let i = 10; i < 10000; i++) {
    const n = i + 1;
    isOk(n) && result.push(n)
  }
  console.log('result', result)
  return result;
}
// fn81()


/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 输入: [0,1,0,3,12] 
 * 输出: [1,3,12,0,0]
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 */
// function fn82(arr) {
//   const mpList = []
//   for (let i = 0; i < arr.length; i++) {
//     const val = arr[i];
//     if (val !== 0) continue
//     mpList.push(i)
//   }
//   for (let i = mpList.length - 1; i >= 0; i--) {
//     const index = mpList[i]
//     arr.splice(index, 1)
//     arr.push(0)
//   }
//   console.log('result', arr, mpList)
// }
function fn82(arr) {
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len - j; i++) {
    const val = arr[i];
    if (val !== 0) continue
    arr.push(0)
    arr.splice(i, 1)
    j++;
    i--;
  }
  console.log('result', arr)
}
// fn82([0, 1, 0, 3, 12])

// 请实现一个 add 函数，满足以下功能。
// add(1); 			// 1
// add(1)(2);  	// 3
// add(1)(2)(3)；// 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

// function curry(fn, ...args) {
//   const len = fn.length;
//   if (args.length >= len) {
//     return fn(...args)
//   }
//   return (...r) => {
//     const payload = [...args, ...r]
//     return curry(fn, ...payload)
//   }
// }

// function fn82_add(a, b, c, d) {
//   return a + b + c + d
// }
// const newAdd = curry(fn82_add, 2)
// console.log('newAdd', newAdd(1)(2)(3))
// console.log('newAdd', newAdd(1, 2)(3))
// console.log('newAdd', newAdd(1, 2, 3))

/** 86
  给定一个整数数组和一个目标值，找出数组中和为目标值的两个数
  你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用
  给定 nums = [2, 7, 11, 15], target = 9
  因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]
 */
function fn86(list, target = 9) {
  let newList = [...list].sort((a, b) => a - b)
  const index = newList.findIndex(n => n > target)
  if (index !== -1 && index < newList.length - 1) {
    newList = newList.slice(0, index)
  }
  if (newList.length < 2) return []
  let x;
  while(x = newList.shift()) {
    for (let i = 0; i < list.length; i++) {
      const y = list[i];
      if (x + y === target) {
        return [x,y]
      }
    }
  }
  return []
}
// console.log('result',fn86([2, 7, 3, 11, 15], 14))

Promise.race = function(promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      const p = promiseArr[i];
      p.then(resolve, reject)
    }
  })
}