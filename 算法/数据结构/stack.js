/**
 * 
 */
class Stack {
  constructor() {
    this.stack = []
  }
  push(val) {
    this.stack.push(val)
  }
  pop() {
    return this.stack.pop()
  }
  size() {
    return this.stack.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this.stack[this.stack.length - 1]
  }
}


/** 用栈实现队列  
 * 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
    push(x) -- 将一个元素放入队列的尾部。
    pop() -- 从队列首部移除元素。
    peek() -- 返回队列首部的元素。
    empty() -- 返回队列是否为空。
 */
class StackQueue {
  constructor() {
    this.stack = new Stack()
    this.cache = new Stack()
  }
  push(val) {
    this.stack.push(val)
  }
  pop(val) {

  }
}