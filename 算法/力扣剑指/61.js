/** easy 扑克牌中的顺子
 * 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
 * 2～10为数字本身，A为1，J为11，Q为12，K为13，
 * 而大、小王为 0 ，可以看成任意数字。
 * A 不能视为 14。

  输入: [1,2,3,4,5]
  输出: True

  输入: [0,0,1,2,5]
  输出: True
 */

/**
 * 重复则返回false 
 * 集合 判断 最大最小值差 不超过5() 
 * 大小王 可以看成任意数字
 */
console.log('[1,2,3,4,5]', isStraight([1,2,3,4,5]))
console.log('[0,0,1,2,5]', isStraight([0,0,1,2,5]))
console.log('[0,0,1,1,5]', isStraight([0,0,1,1,5]))
console.log('[0,6,1,2,5]', isStraight([0,6,1,2,5]))
function isStraight(nums) {
  let min = 14
  let max = 0
  const mp = {}

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === 0) continue // 大小王跳过 
    if (mp[num] !== undefined) return false // 重复数字 直接返回false 
    mp[num] = i

    min = Math.min(min, num)
    max = Math.max(max, num)
  }
  return max - min < 5
}