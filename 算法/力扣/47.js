/** middle 全排列 II
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 
  输入：nums = [1,1,2]
  输出：
  [[1,1,2],
  [1,2,1],
  [2,1,1]]

  输入：nums = [1,2,3]
  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

  1 <= nums.length <= 8
  -10 <= nums[i] <= 10
 */
console.log('[1,1,2]', permuteUnique([1, 1, 2]))
// console.log('[1,2,3]', permuteUnique([1, 2, 3]))
function permuteUnique(nums) {
  const result = []
  const path = []

  function fn(nums, start, q) {
    if (start === q) {
      result.push(path.slice())
      return
    }
    const used = {}
    for (let i = start; i < q; i++) {
      const num = nums[i];
      if (!used[num]) {
        used[num] = true
        swap(nums, start, i)
        path.push(num)
        fn(nums, start + 1, q)
        path.pop()
        swap(nums, start, i)
      }
    }
  }

  fn(nums, 0, nums.length)

  return result
}

function swap(nums, p, q) {
  if (nums.length === 1) return
  const temp = nums[p]
  nums[p] = nums[q]
  nums[q] = temp
}