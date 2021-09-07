

const context = {
  // get query() {
  //   return this.request.query
  // }
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')


defineGetter('response', 'body')
defineSetter('response', 'body')

function defineGetter(target, propname) {
  context.__defineGetter__(propname, function() {
    return this[target][propname]
  })
}

function defineSetter(target, propname){
  context.__defineSetter__(propname, function(value) {
    return this[target][propname] = value
  })
}

module.exports = context