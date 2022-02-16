
function all(tasks, runner, limit) {
  return new Promise((resolve, reject) => {
    let isFailed = false // 是否已经 存在 rejected 任务  
    const result = []
    const len = tasks.length
    let n = 0 // fulfilled 个数
    let index = 0 // 任务索引

    while(limit --) { // 执行上线个数的 任务
      fn()
    }

    function fn() {
      if (isFailed) return // 存在 rejected 任务
      if (index >= len) return // 任务队列 索引越界  
      const p = runner(tasks[index])
      const i = index // 重新锁定 闭包变量
      p.then(res => {
        result[i] = res // 此处直接 使用 index 是最外层的index  所以 需要重新在外层定义变量锁定闭包
        n++
        if (len === n) {
          resolve(result)
        } else {
          fn()
        }
      }, err => {
        isFailed = true
        reject(err)
      })
      index++
    }
  })
}

function createP(val, wait = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('--', val)
      val === 'err'
        ? reject(val)
        : resolve(val)

    }, wait);
  })
}
function test() {
  all(['p1', 'p2', 'p3', 'p4', 'p5', 'p6'], createP, 2).then(res => {
    console.log("~ res", res)
  }).catch(err => {
    console.log("~ err", err)
  })

}
test()