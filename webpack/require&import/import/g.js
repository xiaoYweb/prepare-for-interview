console.log('d 加载')
const { foo } = require('./f')


module.exports = {
  bar
}
function bar() { // export 编译时执行 
  console.log('bar');
  if (Math.random() > 0.5) {
    console.log('random typeof foo', typeof foo) // 第二次执行 为何 foo是undefined 的
    foo();
  }
}