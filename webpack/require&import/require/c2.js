console.log('c2 加载') // 2
exports.done = false
let c1 = require('./c1.js') // 对象引用 第二次加载
console.log('c2.js c1.done', c1.done) // false
exports.done = true
console.log('c2.js ', '执行完毕')