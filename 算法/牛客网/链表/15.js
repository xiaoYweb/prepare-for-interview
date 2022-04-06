/**
 * BM15 删除有序链表中重复的元素-I
 * 删除给出链表中的重复元素（链表中元素从小到大有序），使链表中的所有元素都只出现一次
例如：
给出的链表为1 -> 1 -> 2,返回 1 -> 2.
给出的链表为1 -> 1 -> 2 -> 3 -> 3 ,返回1 -> 2 -> 3

数据范围：链表长度满足 0 \le n \le 1000≤n≤100，链表中任意节点的值满足 |val| \le 100∣val∣≤100
进阶：空间复杂度 O(1)O(1)，时间复杂度 O(n)O(n)
 */

/**
 * 思路 
 * 从小到大(有序)   
 */
function deleteDuplicates(head) {
  if (!head) return null
  let temp = null
  const result = {}
  let current = result
  while(head) {
    const val = head.val
    if (temp !== val) { // 不同
      temp = val
      current.next = { val }
      current = current.next
    }
    head = head.next
  }

  return result.next
}