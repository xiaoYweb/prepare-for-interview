

function stdChannel() {
  let currentTakers = []
  function take(cb, matcher) { // 订阅
    cb['MATCH'] = matcher
    cb.cancel = function () {
      currentTakers = currentTakers.filter(taker => taker !== cb)
    }
    currentTakers.push(cb)
  }
  function put(input) { // 发布
    for (let i = 0; i < currentTakers.length; i++) {
      const cb = currentTakers[i];
      const matcher = taker['MATCH']
      if (matcher(input)) {
        cb.cancel()
        cb(input) // 只监听一次
      }
    }
  }

  return {
    take, put
  }
}

const channel = stdChannel()

function next() {
  console.log('next 执行')
}

function matcher(input) {
  return input.type === 'ASYNC_ADD'
}
channel.take(next, matcher)
channel.put({ type: ASYNC_ADD }) // 传参给 matcher(payload)函数执行 返回为true 则 执行 next(payload)