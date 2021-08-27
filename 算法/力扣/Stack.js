class Stack {
  constructor() {
    this.stack = []
  }
  push(x) {
    this.stack.push(x)
  }
  pop() {
    if (this.isEmpty()) return
    return this.stack.pop()
  }
  peek() {
    if (this.isEmpty()) return
    return this.stack[this.size() - 1]
  }
  size() {
    return this.stack.length
  }
  isEmpty() {
    return this.size() === 0
  }
  toString() {
    return this.stack.join('')
  }
}


module.exports = Stack