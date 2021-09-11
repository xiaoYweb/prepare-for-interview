


function debounce(fn, wait = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args) //  箭头函数 this执行 从上
    }, wait);
  }
}