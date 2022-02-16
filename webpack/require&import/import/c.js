console.log('c 加载')
import { bar } from './d.js'; // import 编译时执行 

export function foo() { // export 编译时执行 
  console.log('foo');
  bar();
  console.log('执行完毕');
}
foo();

// babel-node c.js 
// 通过require模拟 此出打印顺序 存在疑问 !!??
// d 加载
// c 加载

// foo
// bar
// 执行完毕
// 或者是下面的情况
// foo
// bar
// foo
// bar
// 执行完毕 
// 执行完毕 
// 或者是下面的情况
// foo
// bar
// ... * n
// 执行完毕 
// ... * n
