
// 节流 时间戳实现
function throttle(fn, wait = 300) {
  let lastTime = 0; // Date.now() 第一次会触发
  return function (...args) {
    const currentTime = Date.now()
    if (lastTime - currentTime < wait) return
    lastTime = currentTime;
    return fn.apply(this, args)
  }
}

// 节流 定时器实现 最后一次会触发
function throttle(fn, wait = 300) {
  let timer = null;
  return function (...args) {
    if (timer) return
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args)
    }, wait);
  }
}


// 节流 定时器和时间戳的结合版 第一次和最后一次都会触发
function throttle(fn, wait = 300) {
  let lastTime = 0; // Date.now() 第一次会触发
  let timer = null;
  return function (...args) {
    const currentTime = Date.now()
    if (lastTime - currentTime >= wait) {
      timer = null;
      clearTimeout(timer)

      lastTime = currentTime;
      return fn.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    }

  }
}

const throttle = (fn, delay) => {
  let timer = null;
  let lastTime = 0;
  return function (...args) {
    let currentTime = Date.now()
    if (currentTime - lastTime < delay && timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
      return 
    }
    // 到了 delay 时间直接触发，不管了...
    lastTime = currentTime
    fn.apply(this, args)
  }
}