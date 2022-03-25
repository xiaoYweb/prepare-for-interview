const Delegates = require('./delegates')

const context = {

}

Delegates(context, 'request')
  .getter('url')
  .getter('path')

Delegates(context, 'response')
  .access('body')

module.exports = context 
