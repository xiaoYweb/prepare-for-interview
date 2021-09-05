/**
 * react 16 稳定版 同步模式
 * setState 是批量更新 或者说是 异步的
 * setState 第二个参数 cb  是在更新之后  批量执行的
 * 第一个参数 传递 函数 state => ({count: state.count + 1}, () => {log(this.state.count)}) 0 0 2 2
 * 
 */


/**
 * react 17 并发模式 0 0 1 1
 * 不管哪里更新都会合并 ?ß
 */