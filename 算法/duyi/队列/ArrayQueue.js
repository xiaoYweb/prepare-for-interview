/**
 * 2个指针 记录 对头 队尾
 * 存数据  队尾指针向后移动 + 1
 * 取数据 对头指针向后移动 + 1
 * 
 */
class ArrayQueue {
  constructor() {
    this.queue = []
    this.head = 0
    this.tail = 0
    this.maxSize = 1000
  }
  add(val) {
    if (this.isFull()) return
    this.queue[this.tail++] = val
  }
  get() {
    if (this.isEmpty()) return
    return this.queue[this.head++]
  }
  isFull() {
    return this.tail === this.maxSize
  }
  isEmpty() {
    return this.head === this.tail
  }
}