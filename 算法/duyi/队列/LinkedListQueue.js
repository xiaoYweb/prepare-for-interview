class LinkedList {
  constructor(val) {
    this.val = val;
  }
}
class LinkedListQueue {
  constructor() {
    const root = new LinkedList()
    this.head = root;
    this.tail = root;
  }
  add(val) { // 队列满时 抛出异常
    
  }
  offer(val) { // 队列满时 return false

  }
  peek() { // 队列为空 return null
    
  }
  element() { // 队列为空 抛出异常

  }
  remove() { // 队列为空 抛出异常

  }
  poll() { // 队列为空 return null

  }
}