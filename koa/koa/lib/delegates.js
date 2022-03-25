


function Delegates(proto, target) {
  if (!(this instanceof Delegates)) return new Delegates(proto, target)

  this.proto = proto
  this.target = target
}

Delegates.prototype.getter = function (key) {
  const proto = this.proto
  const target = this.target

  proto.__defineGetter__(key, function() {
    return this[target][key]
  })

  return this
}

Delegates.prototype.setter = function (key) {
  const proto = this.proto
  const target = this.target

  proto.__defineSetter__(key, function(val) {
    return this[target][key] = val
  })

  return this
}

Delegates.prototype.access = function () {
  return this.getter().setter()
}


module.exports = Delegates