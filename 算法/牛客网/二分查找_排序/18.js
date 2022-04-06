/**
 * 在一个二维数组array中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
[
[1,2,8,9],
[2,4,9,12],
[4,7,10,13],
[6,8,11,15]
]
给定 target = 7，返回 true。

给定 target = 3，返回 false。
 */

const arr = [
  [1,2,3],
  [2,3,4],
  [7,8,9]
]
/**
 * 思路 
 * 1. 右上角开始 对比 相等 则直接返回true
 * 2. > target 当目标数字比右上角的数字小时 因为右上角的数字是它那一列中最小的，那么目标数字一定比右上角那一列的数字都小 因此，可以将比较的数字左移一排，继续进行比较
 * 3. < target 当目标数字比右上角的数字大时；右上角的数字是那一行中最大的，因此目标数字比哪一行的数字都大，那一行也没有继续比下去的必要了 因此将右上角的数字下移一位，继续进行比较，直到找完或者找到为止
 */
function find(target, array) {
  const y = array.length 
  if (y === 0) return false
  const x = array[0].length
  if (x === 0) return false

  let i = x - 1 // 横向 x
  let j = 0 // 纵向 y
  while(i >= 0 && j < y) {
    const val = array[j][i]
    if (val === target) return true
    if (val < target) { // 小于目标值 
      j ++
    } else { // 大于目标值 
      i --
    }
  }
  return false
}

console.log(find(1, arr))
console.log(find(3, arr))
console.log(find(7, arr))
console.log(find(9, arr))