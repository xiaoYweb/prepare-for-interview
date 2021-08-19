/** easy 用队列实现栈
 * 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

  实现 MyStack 类：

  void push(int x) 将元素 x 压入栈顶。
  int pop() 移除并返回栈顶元素。
  int top() 返回栈顶元素。
  boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

  MyStack myStack = new MyStack();
  myStack.push(1);
  myStack.push(2);
  myStack.top(); // 返回 2
  myStack.pop(); // 返回 2
  myStack.empty(); // 返回 False
 */

class MyQueue {
  constructor() {
    this.queue = []
  }
  add(val) {
    this.queue.push(val)
  }
  poll() {
    if (this.isEmpty()) return false
    return this.queue.shift()
  }
  size() {
    return this.queue.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    if (this.isEmpty()) return
    return this.queue[0]
  }
}

class StackByQueue {
  constructor() {
    this.dataQueue = new MyQueue()
    this.cacheQueue = new MyQueue()
    this.top = -1
  }
  push(val) {
    this.dataQueue.add(val)
  }
  pop() {
    while (this.dataQueue.length > 1) {
      const top = this.dataQueue.poll()
      this.cacheQueue.add(top)
    }
    const num = dataQueue.poll()

    // 交互指针
    const temQueue = this.cacheQueue
    this.cacheQueue = this.dataQueue
    this.dataQueue = temQueue

    return num
  }
  top() {
    return this.dataQueue.peek()
  }
  empty() {
    return this.dataQueuee.isEmpty()
  }
}

// 每次存储数据 

class StackByOneQueue {
  constructor() {
    this.queue = []
  }
  push(val) {
    this.queue.push(val)
    let size = this.queue.size();
    while (size > 1) {
      const tail = this.queue.poll()
      this.queue.offer(tail)
      size--
    }
  }
  pop() {
    return this.queue.poll()
  }
  top() {
    return this.queue.peek()
  }
  isEmpty() {
    return this.queue.isEmpty()
  }
}