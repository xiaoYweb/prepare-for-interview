/** (middle) 哈希 | 双指针
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组
  输入：nums = [-1,0,1,2,-1,-4]
  输出：[[-1,-1,2],[-1,0,1]]

  输入：nums = []
  输出：[]

  输入：nums = [0]
  输出：[]
 */

/**
  拿这个nums数组来举例，首先将数组排序，然后有一层for循环，i从下表0的地方开始，同时定一个下表left 定义在i+1的位置上，定义下表right 在数组结尾的位置上。

  依然还是在数组中找到 abc 使得a + b +c =0，我们这里相当于  a = nums[i] b = nums[left]  c = nums[right]。

  接下来如何移动left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0  就说明 此时三数之和大了，因为数组是排序后了，所以right下表就应该向左移动，这样才能让三数之和小一些。

  如果 nums[i] + nums[left] + nums[right] < 0 说明 此时 三数之和小了，left 就向右移动，才能让三数之和大一些，直到left与right相遇为止。

  时间复杂度：O(n^2)。
 */

// 第一次错误版本 漏了情况  总结 数组随机抽取三项  1+2(双指针 每次外层遍历需要重置双指针位置 才能不遗漏情况)
function threeSumError(nums, sum = 0) { // 双指针
  const len = nums.length;
  if (nums.length < 3) return []
  nums.sort((a, b) => a - b) // 升序
  const result = []
  const map = {}
  console.log('nums', nums)
  let currentIndex = 0;
  let leftIndex = 1;
  let rightIndex = len - 1;
  while (true) {
    const currentValue = nums[currentIndex];
    const leftValue = nums[leftIndex];
    const rightValue = nums[rightIndex]
    const total = currentValue + leftValue + rightValue;
    console.log('---', currentValue, leftValue, rightValue)
    // 和 等于 0
    if (total === sum) {
      const sunItems = [currentValue, leftValue, rightValue]
      const cacheKey = sunItems.toString();
      const cacheItems = map[cacheKey]
      if (!cacheItems) {
        map[cacheKey] = sunItems;
        result.push(sunItems)
        if (currentIndex + 2 !== rightValue) {

        }
        continue
      }
      // 正常情况下 如何全覆盖式变化 此处 currentIndex leftIndex rightIndex 权重递增 权重低的先移动(避免遗漏)
      if (currentIndex + 1 !== leftIndex) { // i 与 左指针 不相邻 
        currentIndex = currentIndex + 1;
        continue
      }
      if (leftIndex + 1 !== rightIndex) {
        leftIndex = leftIndex + 1;
        continue
      }
      return result
    }
    // 和 大于 0 
    if (total > sum) {
      if (leftIndex + 1 !== rightIndex) { // 左指针 与 右指针 不相邻 ---- 右指针 左移一位  (rightIndex -= 1)
        rightIndex = rightIndex - 1;
        continue
      } else { // 左指针 与 右指针 相邻 ---- 结束循环 返回结果
        return result;
      }
    }

    // 和 小于 0  一定是 左指针 或者 索引移动  sum才有可能增加 
    if (leftIndex + 1 !== rightIndex) { // 左指针 与 右指针 不相邻 
      leftIndex = leftIndex + 1
    } else { // 左指针 与 右指针 相邻  
      if (currentIndex + 1 !== leftIndex) {
        currentIndex = currentIndex + 1;
        leftIndex = currentIndex + 1;
      } else { // 三针相邻 ---- 结束循环 返回结果
        return result;
      }
    }
  }
}

/**
 * i left right  
 * i 为外层遍历循环 nums.length - 2 次
 * 使用双指针前提是 升序或降序的情况 (此处使用升序 - 递增)
 * sum > 0  right -- sum 才有可能减少
 * sum < 0  left ++ sum 才有可能增加
 * sum === 0 right --  left ++  才有可能再次达到平衡
 * 去重
 */
function threeSum(nums, sum = 0) { // 双指针
  const numList = nums.slice()
  numList.sort((a, b) => a - b)
  const result = []

  for (let i = 0; i < numList.length; i++) {
    if (i > 0 && numList[i] === numList[i - 1]) continue // 跳过重复项
    let left = i + 1; // 重置 
    let right = numList.length - 1; // 重置 

    while (left < right) {
      const total = numList[i] + numList[left] + numList[right];
      if (total > sum) {
        right--
      } else if (total < sum) {
        left++
      } else { // 相等 则左右2遍都向内移动一位
        result.push([numList[i], numList[left++], numList[right--]])
        while (numList[left] === numList[left - 1]) { // 跳过重复项 当前项 与前一项对比 
          left++
        }
        while (numList[right] === numList[right + 1]) { // 跳过重复项 当前项 与前一项对比 
          right--
        }
      }
    }
  }

  return result;
}

// console.log('[-1,0,1,2,-1,-4] result', threeSum([-1, 0, 1, 2, -1, -4])) // [[-1,-1,2],[-1,0,1]]