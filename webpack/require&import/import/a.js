import values, { counter } from './b.js'
values.n = 2
// counter = {} // 修改报错 只读
// values = {} // 修改报错 只读
console.log('a.js values', values) // { count: 1 }
console.log('a.js counter', counter) // { count: 1 }

setTimeout(() => {
  console.log('a.js counter.count', counter.count) // 2
  counter.count ++
}, 1500)

export default {}


// node a.js
// ES6_Module 引入变量 只读 
// a.js-1 1
// a.js-2 1
// b.js-1 2  // 1秒后
// a.js-3 3 