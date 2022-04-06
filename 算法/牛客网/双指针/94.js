/**
 * 给定一个整形数组arr，已知其中所有的值都是非负的，将这个数组看作一个柱子高度图，计算按此排列的柱子，下雨之后能接多少雨水。(数组以外的区域高度视为0)
 * 
 * 0<= arr.length <= 10^5 
 */

console.log(maxWater([3, 1, 2, 5, 2, 4])) // 5
console.log(maxWater([4, 5, 1, 3, 2])) // 2

// 双指针
/**
 * 当前柱子右边第一个最大高度 比 左边第一个最大高度高时  积水由 左边的柱子决定 反之同理 
 * 
 */
function maxWater1(arr) {
  if (arr.length < 3) return 0
  let left = 0, right = arr.length - 1, res = 0, leftMaxHeight = 0, rightMaxHeight = 0;

  while (left < right) {
    if (arr[left] < arr[right]) { // 右指针的柱子 高 || 相等
      if (arr[left] >= leftMaxHeight) { // 递增 || 相等 不积水
        leftMaxHeight = arr[left]
      } else { // 递减  积水 
        res += (leftMaxHeight - arr[left])
      }
      left++
    } else { // 左指针的柱子 高 || 相等
      if (arr[right] >= rightMaxHeight) { // 递增 || 相等 不积水
        rightMaxHeight = arr[right]
      } else {
        res += (rightMaxHeight - arr[right])
      }
      right --
    }
  }

  return res
}

// dp
/**
 * 先遍历2次 
 * 从左到右遍历 计算出 当前位置 左边柱子的最大高度
 * 从右到左遍历 计算出 当前位置 右边柱子的最大高度
 */
function maxWater(arr) {
  if (arr.length < 3) return 0
  const leftHeight = []
  const rightHeight = []
  let maxHeight = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxHeight) {
      maxHeight = arr[i]
    }
    leftHeight[i] = maxHeight
  }
  maxHeight = 0
  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] > maxHeight) {
      maxHeight = arr[i]
    }
    rightHeight[i] = maxHeight
  }
  let res = 0
  for (let i = 0; i < arr.length; i++) {
    const min = Math.min(leftHeight[i], rightHeight[i])
    res += (min - arr[i])
  }

  return res
}