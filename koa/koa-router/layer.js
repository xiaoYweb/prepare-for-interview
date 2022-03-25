class Layer {
  constructor(method, url, callback) {
    this.method = method
    this.url = url
    this.callback = callback
  }

  match(method, url) {
    return this.method === method.toLowerCase() && this.url === url
  }
}

module.exports = Layer
