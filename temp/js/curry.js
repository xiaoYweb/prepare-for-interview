

function curry(fn, ...args) {
  return function (...rest) {
    const payload = args.concat(rest)
    if (payload.length >= fn.length) {
      return fn.apply(this, payload)
    }
    return curry(fn, ...payload)
  }
}

function add(a, b, c, d) {
  return a + b + c + d
}

const fn = curry(add, 1)
console.log(fn(2)(3))
console.log(fn(2)(3)(4))
console.log(fn(2)(3, 4))
console.log(fn(2, 3, 4))
console.log(fn(2, 3, 4, 5))