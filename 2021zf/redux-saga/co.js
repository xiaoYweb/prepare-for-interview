

function* generator() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
  const c = yield 3
  console.log(c)
}

function co(generator) {
  const it = generator()
  let result
  function next(arg) {
    result = it.next(arg)
    !result.done && next(result.value)
  }
  next()
}

co(generator)