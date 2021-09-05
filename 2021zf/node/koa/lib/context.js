
const context = {
  get query() {
    return this.request.query
  }
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')
defineGetter('request', 'body')


defineSetter('request', 'body')


function defineGetter(target, propname) {
  context.__defineGetter__(propname, function () {
    return this[target][propname]
  })
}
function defineSetter(target, propname) {
  context.__defineSetter__(propname, function (value) {
    this[target][propname] = value
  })
}

module.exports = context