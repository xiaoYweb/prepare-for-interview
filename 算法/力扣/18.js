/** (middle) 双指针
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。
 * 请你找出并返回满足下述全部条件且 不重复 的四元组 [nums[a], nums[b], nums[c], nums[d]] ：
  
  输入：nums = [1,0,-1,0,-2,2], target = 0
  输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

  输入：nums = [2,2,2,2,2], target = 8
  输出：[[2,2,2,2]]
 */


function fourSum(nums, sum = 0) {
  if (!Array.isArray(nums) || nums.length < 4) return []
  const numList = nums.slice()
  numList.sort((a, b) => a - b)
  // console.log("🚀~ numList", numList)
  const result = []

  for (let i = 0; i < numList.length - 3; i++) {
    if (i > 0 && numList[i] === numList[i - 1]) continue // 跳过重复项 当前项 与前一项对比 
    for (let j = i + 1; j < numList.length - 2; j++) {
      if (j > i + 1 && numList[j] === numList[j - 1]) continue // 跳过重复项 当前项 与前一项对比 
      let left = j + 1;
      let right = numList.length - 1;
      while (left < right) {
        const total = numList[i] + numList[j] + numList[left] + numList[right]
        if (total > sum) {
          right--
        } else if (total < sum) {
          left++
        } else {
          result.push([numList[i], numList[j], numList[left++], numList[right--]])
          while (numList[left] === numList[left - 1]) { // 跳过重复项 当前项 与前一项对比 
            left++
          }
          while (numList[right] === numList[right + 1]) { // 跳过重复项 当前项 与前一项对比 
            right--
          }
        }
      }
    }
  }

  return result;
}

// console.log('fourSum', fourSum([1, 0, -1, 0, -2, 2]))
// console.log('fourSum', fourSum([2, 2, 2, 2], 8))


// 以此类推 五数之和 六数之和
function fiveSum(nums, sum = 0) {
  if (!Array.isArray(nums) || nums.length < 5) return []
  const numsList = nums.slice()
  numsList.sort((a, b) => a - b)
  const result = []
  console.log("🚀  ~ numsList", numsList)
  for (let i = 0; i < numsList.length - 4; i++) {
  
    if (i > 0 && numsList[i] === numsList[i - 1]) continue
    for (let j = i + 1; j < numsList.length - 3; j++) {
      if (j > i + 1 && numsList[j] === numsList[j - 1]) continue
      for (let k = i + 2; k < numsList.length - 2; k++) {
        if (k > i + 2 && numsList[k] === numsList[k - 1]) continue
        let left = k + 1;
        let right = numsList.length - 1;
        while (left < right) {
          console.log(i,j,k,left, right,'--', numsList[i], numsList[j], numsList[k], numsList[left], numsList[right])
          const total = numsList[i] + numsList[j] + numsList[k] + numsList[left] + numsList[right]
          if (total > sum) {
            right--
          } else if (total < sum) {
            left++
          } else {
            result.push([numsList[i], numsList[j], numsList[k], numsList[left++], numsList[right--]])
            while (numsList[left] === numsList[left - 1]) {
              left++
            }
            while (numsList[right] === numsList[right + 1]) {
              right--
            }
          }
        }
      }
    }
  }

  return result;
}

// console.log('fiveSum', fiveSum([2, 2, 2, 2, 2], 10))
// console.log('fiveSum', fiveSum([2, 2, -2, 2, -1, 1, 3, -4]))