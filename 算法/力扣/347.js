/** middle 前 K 个高频元素
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 * 
  输入: nums = [1,1,1,2,2,3], k = 2
  输出: [1,2]

  输入: nums = [1], k = 1
  输出: [1]

  提示：
  1 <= nums.length <= 105
  k 的取值范围是 [1, 数组中不相同的元素的个数]
  题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的

  进阶：
  你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
 */
console.log('[1,1,1,2,2,3] 2 -> ', topKFrequent([1, 1, 1, 2, 2, 3], 2))
console.log('[1] 1 -> ', topKFrequent([1], 1))

// 集合计数 然后按频率排序 此处 直接sort 偷懒方案   排序方案 小顶堆
function topKFrequent(nums, k) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    mp[num] = (mp[num] || (mp[num] = 0)) + 1
  }
  // mp计数 后排序 
  const result = Object.entries(mp).sort((a, b) => b[1] - a[1])
  return result.slice(0, k).map(item => +item[0])
}

// mp计数  小顶堆 排序 
function topKFrequent(nums, k) {
  // todo
}