/** middle 队列的最大值 
 * 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。

  输入: 
  ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
  [[],[1],[2],[],[],[]]
  输出: [null,null,null,2,1,2]

  输入: 
  ["MaxQueue","pop_front","max_value"]
  [[],[],[]]
  输出: [null,-1,-1]
 */

/**
 * 队列发生更改时 记录最大值
 * 新增 删除 都会影响 最大值
 * 删除 如果删除元素不是最大值 则不变 如果是则 需要在剩下的元素中拿到最大值
 * 新增 提供新的火元素 大于最大值 则修改  如果不是 则不变
 * 使用额外的队列记录最大值 
 * 原队列       max队列
 * [1]          [1]
 * [1,2]        [2]
 * [1,2,3]      [3]
 * [1,2,3,2]    [3,2]
 * [2,3,2,1]     [3,2,1]
 * [2,3,2,1,3]   [3,3]
 * 1. max 队列对头元素 是当前的最大值 其他元素是未来可能成为最大指的候选值
 * 2. 新增元素时 while(maxQueue.length && el > maxQueue.peekLast) pop 
 * 3.          maxQueue.push(val)
 * 4. 删除元素时 若maxQueue.length && queue[0] === maxQueue[0] maxQueue.shift()
 *             queue.shift()
 */

class MaxQueue {
  constructor() {
    this.queue = []
    this.maxQueue = []
  }
  maxValue() {
    if (this.maxQueue.length === 0) return -1
    return this.maxQueue[0]
  }
  pushBack(val) {
    const { queue, maxQueue } = this;
    queue.push(val)

    while (
      maxQueue.length && this.peekMaxQueueLast() < val
    ) {
      maxQueue.pop()
    }

    maxQueue.push(val)
  }
  popFront() {
    const { queue, maxQueue } = this;
    // 如果删除的元素是最大值  从maxQueue中同时删除
    if(queue.length === 0) return -1

    if (maxQueue.length && queue[0] === maxQueue[0]) {
      maxQueue.shift()
    }

    return queue.shift()
  }
  peekMaxQueueLast() {
    return this.maxQueue[this.maxQueue.length - 1] 
  }
  
}