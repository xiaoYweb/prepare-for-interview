
// 返回 iterator 对象 不断调用 next 进行迭代 
// 方法 
function* read() {
  const a = yield 1
  const b = yield 2
  const c = yield 3
}

const it = read()
console.log(it.next(11)) // {value: 1, done: false} 第一次传参 无意义
console.log(it.next(22)) // 传参为 上一个yield的传参
console.log(it.next(33))
console.log(it.next(44)) // {}
// console.log(it.next()) // {value: 1, done: false}
console.log([...it]) // [1,2,3]
console.log(Array.from({ 0: 1, 1: 2, 2: 3, length: 3 })) // 
// console.log([...{ 0: 1, 1: 2, 2: 3, length: 3 }]) // error
// Symbol 可以进行元编程 可以改写js本身的方法 
console.log({
  age: 11,
  get [Symbol.toStringTag]() {
    return 'xxx'
  }
}.toString()) // [object, Object]  [object, xxx]
console.log([
  ...{
    0: 1, 1: 2, 2: 3, length: 3,
    // [Symbol.iterator]: function* () {
    //   yield 1
    //   yield 2
    //   yield 3
    // },
    // [Symbol.iterator]: function() {
    //   let i = 0
    //   const obj = this;
    //   return {
    //     next() {
    //       return {
    //         value: obj[i],
    //         done: i++ === obj.length
    //       }
    //     }
    //   }
    // },
    [Symbol.iterator]: function* () {
      let index = 0
      while (index < this.length) {
        yield this[index++]
      }
    },
  }
]) // 

