/** 回溯middle 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

  解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

  输入：nums = [1,2,3]
  输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  输入：nums = [0]
  输出：[[],[0]]
 */
console.log('[1,2,3]', subsets([1, 2, 3]))
console.log('[0]', subsets([0]))
function subsets(nums) { // 参考 77 题延伸版
  const reuslt = [[]]
  const path = []
  
  function fn(start) {
    if (path.length === nums.length) {
      return 
    }
    for (let i = start; i < nums.length; i++) {
      const num = nums[i];
      
      path.push(num)
      // console.log(path)
      reuslt.push(path.slice())
      fn(i + 1) // 此处传递的 为 i+1  
      path.pop(num)
    }
  }

  fn(0)

  return reuslt
}