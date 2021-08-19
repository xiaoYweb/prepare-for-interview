/** hard 滑动窗口的最大值
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
  输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
  输出: [3,3,5,5,6,7] 
  解释: 

    滑动窗口的位置                最大值
  ---------------               -----
  [1  3  -1] -3  5  3  6  7       3
  1 [3  -1  -3] 5  3  6  7       3
  1  3 [-1  -3  5] 3  6  7       5
  1  3  -1 [-3  5  3] 6  7       5
  1  3  -1  -3 [5  3  6] 7       6
  1  3  -1  -3  5 [3  6  7]      7

  输入：nums = [1], k = 1
  输出：[1]
  输入：nums = [1,-1], k = 1
  输出：[1,-1]
  输入：nums = [9,11], k = 2
  输出：[11]
  输入：nums = [4,-2], k = 2
  输出：[4]
 */

/**
 * 求队列的最大值 
 * 数组长度 len 窗口大小为 k 可形成的窗口数量 n - k + 1
 * 在窗口变化过程中 记录最大值变化 (让最大值一直出现在第一位)
 * 让队列中已存在元素和 新添加的元素比较 
 * if 已存在 < 新添加
 * else
 * [1 3 -1 -3 5 3 6 7]
 * 第一次 新增3个元素 元素 1 max添加 元素3 max移除再添加 元素-1 max添加
 * [1 3 -1]   [1] -> [3] -> [3, -1]  
 * 第二次 出栈一个元素 进栈一个元素 (移除1) (新增-3) max添加
 * [3 -1 -3]  [3 -1 -3]        
 * 第三次 出栈一个元素 进栈一个元素  (移除3) max移除3 (新增5)  max移除*2再添加   
 * [-1 -3 5]  [5]
 * ...
 */
console.log('[1 3 -1 -3 5 3 6 7]', maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
console.log('[1,-1]', maxSlidingWindow([1, -1], 1))

function maxSlidingWindow(nums, k) {
  const result = new Array(nums.length - k + 1)
  const queue = []
  // 第一次 队列 add 3个元素 
  for (let i = 0; i < k; i++) {
    const num = nums[i];
    while (queue.length && queue[queue.length - 1] < num) {
      queue.pop()
    }
    queue.push(num)
  }
  result[0] = queue[0]

  // 队列 poll 1个元素 add一个元素
  for (let i = k; i < nums.length; i++) {
    const num = nums[i];
    // 处理删除
    if (queue[0] === nums[i - k]) {
      queue.shift()
    }
    // 处理新增
    while (queue.length && queue[queue.length - 1] < num) {
      queue.pop()
    }
    queue.push(num)
    result[i - k + 1] = queue[0]
  }

  return result
}
function maxSlidingWindow1(nums, k) { // 边界 1 <= k <= nums.length
  const result = []
  const queue = []
  for (let i = 0; i < k; i++) {
    queue.push(nums[i])
  }

  result.push(findQueueMaxValue(queue))

  for (let i = k; i < nums.length; i++) {
    const num = nums[i]
    queue.shift()
    queue.push(num)
    result.push(findQueueMaxValue(queue))
  }

  function findQueueMaxValue(queue, i) {
    queue = queue.slice()
    const maxQueue = []
    while (queue.length) {
      const val = queue.shift()
      while (maxQueue.length && maxQueue[maxQueue.length - 1] < val) {
        maxQueue.pop()
      }
      maxQueue.push(val)
    }
    return maxQueue[0]
  }

  return result;
}