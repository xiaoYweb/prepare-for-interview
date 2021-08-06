

function curry(fn, ...args1) {
  const len = fn.length;

  return function (...args2) {
    const paylaod = [...args1, ...args2]
    if (paylaod.length > len) {
      return fn.apply(this, payload)
    }
  }
}