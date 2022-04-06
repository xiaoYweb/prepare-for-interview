/**
 * BM13 判断一个链表是否为回文结构
 * 给定一个链表，请判断该链表是否为回文结构。
  回文是指该字符串正序逆序完全一致。
  数据范围： 链表节点数  0 <= n <= 10^5  
  链表中每个节点的值满足 val <= 10^7
  {1} true
  {1,2} false
  {1,2,2,1} true 
 */

function isPail(head) {
  if (!head) return false
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  const len = arr.length
  if (len < 2) return true
  let n = Math.floor(len / 2) // 4 5  2
  for (let i = 0; i < n; i++) {
    if (len % 2 === 0) { // 偶数个
      if (arr[n - i - 1] !== arr[n + i]) return false
    } else { // 奇数个
      if (arr[n - i - 1] !== arr[n + i + 1]) return false
    }
  }

  return true
}