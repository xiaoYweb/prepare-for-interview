/**
 * 浏览器事件循环
 * 
 * 
 * node事件循环
 * 
 * timers 
 * I/O callbacks
 * idles prepares
 * poll
 * check
 * close callbacks
 */

// node事件循环 执行顺序 start end nextTick then setTimeout setImmediate
console.log('start')
setImmediate(() => {
    console.log('setImmediate')
})
// 优先级比 setImmediate 更高
setTimeout(() => {
    console.log('setTimeout')
}, 0);
Promise.resolve('').then(() => {
    console.log('Promise then')
})
// nextTick 微任务中 优先级最高
process.nextTick(() => {
    console.log('nextTick')
})
console.log('end')