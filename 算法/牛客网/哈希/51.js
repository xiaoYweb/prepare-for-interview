/**
 * 给一个长度为 n 的数组，数组中有一个数字((出现的次数超过数组长度的一半))，请找出这个数字。
例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。


保证数组输入非空，且保证有解
 */

console.log(MoreThanHalfNum_Solution([1, 2, 3, 2, 2, 2, 5, 4, 2])) // 2
console.log(MoreThanHalfNum_Solution([3, 3, 3, 3, 2, 2, 2])) // 3
console.log(MoreThanHalfNum_Solution([1])) // 
function MoreThanHalfNum_Solution(numbers) {
  let len = numbers.length
  if (len === 1) return numbers[0]
  const half = Math.floor(len / 2)
  const mp = {}
  let max = 0
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    mp[num] = (mp[num] || 0) + 1
    max = Math.max(max, mp[num])
    if (max > half) {
      return num
    }
  }
}