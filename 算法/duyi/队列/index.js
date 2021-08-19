/**
 * 队列 从尾部存入数据 从头部取出数据
 * 先进先出fifo 后进后出
 * 
 * 队列的实现方式 
 * 1. 顺序队列(基于数组)
 * 2. 链式队列(基于链表)
 */

/**
 * 2个指针 记录 对头 队尾
 * 存数据  队尾指针向后移动 + 1
 * 取数据 对头指针向后移动 + 1
 * 
 */


/**
 * 双端队列  2端都可以 存取数据
 * deque  double ended queue
 * ArrayDeque
 * LinkedList
 */

class ArrayDeque {
  
}
class LinkedList {

}

/**
 * 特别的队列
 * 1. 优先级队列 (PriorityQueue) 
 *    元素携带了相关的优先级 优先级高的 排在头部 
 * 2. 阻塞队列 (BlockingQueue)
 *    当队列满的时候 等到有空余位置在存储 put()
 *    当队列空的时候 等到有数据再取数据 take()
 *    分为无限期等待 和 有阻塞时间的等待
 * 3. 延迟队列 (DelayQueue) 给定一个接口设置延迟时间 元素会按照过期时间排序
 *    在一个指定时间内获取队列元素 此时头元素最接近过期时间 
 *    筛选已过期的元素 移除
 */

/**
 * 队列的最大值 leetcode 力扣剑指 59
 * 
 */

/**
 * 滑动窗口的最大值 LeetCode 239
 */

/**
 * 设计循环队列 622
 * 为了解决队列存储数据，空间无法重复利用问题，通过构建环形，重复利用
 */
class CircularQueue {
  constructor(capacity = 1000) {
    this.capacity = capacity
    this.queue = new Array(capacity)
    this.head = 0 // 头指针
    this.tail = 0 // 头指针
    this.count = 0
  }
  isEmpty() {
    return this.count === 0
  }
  isFull () {
    return this.count === this.capacity;
  }
  enQueue(val) {
    if (this.isFull()) return false;
    const i = (this.head + this.count) % this.capacity
    this.queue[i] = val
    this.count ++
    return true;
  }
  deQueue() {
    if (this.isEmpty()) return false
    this.head = (this.head + 1) % this.capacity
    count -- 
    return true
  }
  front() {
    if (this.isEmpty) return -1;
    return this.queue[this.head]
  }
  rear() {
    if (this.isEmpty) return -1;
    const tail = (this.head + this.count - 1) % this.capacity
  }
}