

function throttle(fn, delay = 300) {
  let lastTime = 0
  return function () {
    const currentTime = Date.now()
    if (currentTime - lastTime > delay) {
      lastTime = currentTime
      return fn.apply(this, arguments)
    }
  }
}
