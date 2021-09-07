

function curry(fn, ...args1) {
  return function func(...args2) {
    const paylaod = [...args1, ...args2]
    if (paylaod.length > fn.length) {
      return fn.apply(this, payload)
    }
    return curry(fn, ...paylaod)
  }
}

const fn = curry(add, 1)
console.log(fn(2)(3))
console.log(fn(2)(3)(4))
console.log(fn(2)(3, 4))
console.log(fn(2, 3, 4))
console.log(fn(2, 3, 4, 5))