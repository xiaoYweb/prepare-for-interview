
module.exports = Delegate

function Delegate(proto, target) {
  if (!(this instanceof Delegate)) return new Delegate(proto, target)
  this.target = target;
  this.proto = proto;
}


// delegate(proto, 'response')
//   .getter('headerSent')
//   .getter('writable');
Delegate.prototype.getter = function (key) {
  const proto = this.proto
  const target = this.target
  
  proto.__defineGetter__(key, function () {
    return this[target][key]
  })

  return this
}

Delegate.prototype.setter = function (key) {
  const proto = this.proto
  const target = this.target

  proto.__defineSetter__(key, function (val) {
    return this[target][key] = val
  })

  return this
}

Delegate.prototype.access = function (key) {
  return this.getter(key).setter(key)
}