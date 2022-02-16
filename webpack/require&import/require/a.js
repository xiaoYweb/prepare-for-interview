let mod = require('./b.js') // 第一次导入 对象内的值 属于 浅拷贝
// 多次导入 与第一次导入对象 属于同一 引用地址 
// 多次导入 导入模块的代码 仅 第一次执行   
let mod2 = require('./b.js')


function fn1() {
  console.log('a.js-1', mod.count)
  mod.plusCount()
  console.log('a.js-2', mod.count)
  console.log('a.js mod.tom', mod.tom)
  mod.modifyTom()
  console.log('a.js mod.tom', mod.tom)

  setTimeout(() => {
    mod.count = 3
    mod2.count = 4
    console.log('a.js-3 mod.count', mod.count)
    console.log('a.js-4 mod2.count', mod2.count)
  }, 2000)
}

// fn1()

// Commonjs 导入的值 属于 浅拷贝  

// node a.js
// a.js-1 1
// a.js-2 1
// b.js-1 2  // 1秒后
// a.js-3 3 

function fn2() {
  let { count: count1 } = require('./b.js')
  console.log('count1', count1)
  count1 ++ 
  let { count: count2 } = require('./b.js')
  console.log('count2', count2)
}
fn2()

