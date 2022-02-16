console.log('c1 加载') // 1
exports.done = false
let c2 = require('./c2.js')
console.log('c1.js c2.done', c2.done) // true
exports.done = true
console.log('c1.js ', '执行完毕')