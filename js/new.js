

function _new(constructor, ...args) {
  if (constructor !== 'function') {
    throw new Error(`${constructor} is not a constructor`)
  }
  const object = Object.create(constructor.prototype)

  const result = constructor.apply(object, args)

  return isObject(result) ? result : object;
}

function isObject(val) {
  if (val === null) return false
  const type = typeof val
  if (type === 'function') return true
  return type === 'object';
}