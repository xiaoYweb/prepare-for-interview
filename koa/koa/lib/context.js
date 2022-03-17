const delegates = require('./delegates')


const context  = {
  // get url() {
  //   return this.req.url
  // }
}

function defineGetter(key, target) {
  context.__defineGetter__(key, function() {
    return this[target][key]
  })
}

function defineSetter(key, target) {
  context.__defineSetter__(key, function(val) {
    this[target][key] = val
  })
}

delegates(context, 'request')
  .getter('url')
  .getter('path')
  .getter('query')
  .access('body')
// defineGetter('path', 'request')


// defineGetter('body', 'response')
// defineSetter('body', 'response')


module.exports = context