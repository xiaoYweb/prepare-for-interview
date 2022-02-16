let c1 = require('./c1.js') // 第一次加载
let c2 = require('./c2.js') // 第二次加载

console.log('c.js-1', '执行完毕', c1.done, c2.done)

// node c.js
// c1 加载
// c2 加载
// c2.js c1.done false
// c2.js  执行完毕
// c1.js c2.done true
// c1.js  执行完毕
// c.js-1 执行完毕 true true

// 当遇到require命令时，会执行对应的模块代码。当循环引用时，有可能只输出某模块代码的一部分。当引用同一个模块时，不会再次加载，而是获取缓存