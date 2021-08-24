/** middle 全排列
 *  给定一个  不含重复数字   的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * 
 * 
 * 输入：nums = [1,2,3] 1 * 2 * 3 
    输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

    输入：nums = [0,1] 1 * 2
    输出：[[0,1],[1,0]]

    输入：nums = [1] 1
    输出：[[1]]

    输入：nums = [1,2,3,4]  24  1 * 2 * 3 * 4
    输出：[
      [1,2,3,4], [1,...], ...* 6
      *4
    ] 
 */
console.log('permute', permute([1, 2, 3]))
function permute(nums, result = []) {
  console.log("🚀 ~ file: 46.js ~ line 16 ~ permute ~ nums", nums)
  if (nums.length === 1) return [nums];
  if (nums.length === 2) return [
    [nums[0], nums[1]]
    [nums[1], nums[0]]
  ]
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const left = nums.slice(0, i)
    const right = nums.slice(i + 1)
    const res = [num, ...permute(left.concat(right)).flat(2)]
    result.push(res)
  }

  function fn(size, result) {
    const addItem = nums[size - 1]
    while (size >= 0 ) {
      for (let i = 0; i < result.length; i++) {
        result[i].splice(size, 0, addItem)

      }
      
      size--
    }
  }
  return result
}