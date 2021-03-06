/** easy 用栈实现队列
 * 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
 * 
 * void push(int x) 将元素 x 推到队列的末尾
  int pop() 从队列的开头移除并返回元素
  int peek() 返回队列开头的元素
  boolean empty() 如果队列为空，返回 true ；否则，返回 false

  你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
  你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。


  进阶
  你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间

  输入：
  ["MyQueue", "push", "push", "peek", "pop", "empty"]
  [[], [1], [2], [], [], []]
  输出：
  [null, null, null, 1, 1, false]

  解释：
  MyQueue myQueue = new MyQueue();
  myQueue.push(1); // queue is: [1]
  myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
  myQueue.peek(); // return 1
  myQueue.pop(); // return 1, queue is [2]
  myQueue.empty(); // return false

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

/**
 * 2 2
 */
class Queue {
  constructor() {
    this.queue = new Stack()
    this.chace = new Stack()
  }
  push(val) {
    this.queue.push(val)
  }
  pop() {
    let n = this.queue.size()
    if (n === 0) return 
    while(--n) {
      this.chace.push(this.queue.pop())
    }
    const res = this.queue.pop()
    // 交互指针
    while(this.chace.size()) {
      this.queue.push(this.chace.pop())
    }

    return res
  }
  peek() {
    let n = this.queue.size()
    if (n === 0) return 
    let res
    while(n--) {
      res = this.queue.pop()
      this.chace.push(res)
    }
    // 交互指针
    while(this.chace.size()) {
      this.queue.push(this.chace.pop())
    }

    return res
  }
  empty() {
    return this.queue.isEmpty()
  }
}

// const myQueue = new Queue();
// console.log(myQueue.push(1)); // queue is: [1]
// console.log(myQueue.push(2)); // queue is: [1, 2] (leftmost is front of the queue)
// console.log(myQueue.peek(), myQueue.queue); // return 1
// console.log(myQueue.pop(), myQueue.queue); // return 1, queue is [2]
// console.log(myQueue.empty()); // return false

/**
 * 进阶升级版
 */
class MyQueue {
  constructor(){
    this.inStack = new Stack()
    this.outStack = new Stack()
  }
  push(x) {
    this.inStack.push(x)
  }
  peek() {
    if (this.empty()) return 
    this.in2out()
    return this.outStack.peek()
  }
  pop() {
    if (this.empty()) return
    this.in2out()
    return this.outStack.pop()
  }
  in2out() { // 将入栈 转移到 出栈 
    if (!this.outStack.isEmpty()) return 
    while(!this.inStack.isEmpty()) {
      this.outStack.push(this.inStack.pop())
    }
  }
  empty() {
    return this.inStack.isEmpty() && this.outStack.isEmpty()
  }
}

const myQueue = new MyQueue();
console.log(myQueue.push(1)); // queue is: [1]
console.log(myQueue.push(2)); // queue is: [1, 2] (leftmost is front of the queue)
console.log(myQueue.peek()); // return 1
console.log(myQueue.pop()); // return 1, queue is [2]
console.log(myQueue.empty()); // return false