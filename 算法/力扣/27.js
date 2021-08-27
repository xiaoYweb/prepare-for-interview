/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

  不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

  元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

  输入：nums = [3,2,2,3], val = 3
  输出：2, nums = [2,2]
  解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。

  输入：nums = [0,1,2,2,3,0,4,2], val = 2
  输出：5, nums = [0,1,4,0,3]
  解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。

 */
console.log('', removeElement([3, 2, 2, 3], 3)) // 2
console.log('', removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)) // 3
function removeElement(nums, val) {
  let len = nums.length;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1)
      i--
      len--
    }
  }
  return len
  // return nums
}

/**
 * [3,2,1,4] 3
 * 元素 索引位置 
 * 3    0       [3,2,1,4]
 * 2    0->1 覆盖索引位置 然后 索引index++ [2,2,1,4]
 * 1    1->2 [2,1,1,4]
 * 4    2->3 [2,1,4,4]
 */
function removeElement(nums, val) {
  let index = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === val) continue
    nums[index++] = num
  }
  // return nums.slice(0, index)
  return index
}

/**
 * 遍历到对应位置 若===val  则与最后一个元素 交换位置 len --  i--
 * [2,1,2,2,4] 2  len = 5
 * [4,1,2,2] 2   len = 4
 * ...
 * 
 * [2] 2  
 */
function removeElement(nums, val) {
  if (nums.length === 0) return 0
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (num === val) {
      nums[i] = nums[len - 1]
      i--
      len--
    }
  }
  // return nums.slice(0, len)
  return len
}

function removeElement(nums, val) {
  let len = nums.length
  
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (num === val) {
      len --
      [nums[i], nums[len]] = [nums[len], num]
      i --
    }
  }

  // return nums
  // .slice(nums.length - len)
  return len
}