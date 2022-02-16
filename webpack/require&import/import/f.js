console.log('c 加载')


module.exports = {
  foo
}

const { bar } = require('./g') 

function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}

foo();

// babel-node c.js 
// 通过require模拟 此出打印顺序 存在疑问 !!??
// c 加载
// d 加载

// foo
// bar
// 执行完毕
// 或者是下面的情况
// foo
// bar
// foo // 报错 foo is undefined
// bar
// 执行完毕 
// 执行完毕 
// 或者是下面的情况
// foo
// bar
// ... * n
// 执行完毕 
// ... * n
