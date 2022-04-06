/**
 * BM16 删除有序链表中重复的元素-II mid
 * 给出一个升序排序的链表，删除链表中的所有重复出现的元素，只保留原链表中只出现一次的元素。
例如：
给出的链表为1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5,返回 1 -> 2 -> 5.
给出的链表为1 -> 1 -> 1 -> 2 -> 3 ,返回 2 -> 3

数据范围：链表长度满足 0≤n≤10^5，链表中任意节点的值满足 ∣val∣≤10^5
要求：空间复杂度 O(n)O(n)，时间复杂度 O(n)O(n)
进阶：空间复杂度 O(1)O(1)，时间复杂度 O(n)O(n)
 */

/**
 * 升序排序的链表 即 从小到大 
 * 
 */
function deleteDuplicates(head) {
  if (!head) return null
  let currentVal = null
  let times = 0

  const result = {}
  let current = result
  while (head) {
    const val = head.val
    if (currentVal === null) { // val值 第一次出现
      currentVal = val
      times = 1
    } else if (currentVal === val) { // val值 第 n>1 次出现 且与上一次 相同
      times++
    } else { // currentVal 存在 且与上一次 不相同
      if (times === 1) {
        current.next = { val: currentVal }
        current = current.next
      }


      currentVal = val
      times = 1
    }

    head = head.next
  }
  // 最后一次 需要处理的逻辑
  if (times === 1) {
    current.next = { val: currentVal }
    current = current.next
  }

  return result.next
}

/**
 * 当前节点与上一节点 和 下一节点不同 
 * 
 */

function deleteDuplicates(head) {
  if (!head) return null

  const result = {}
  let current = result

  let prev = null // 上一个值

  while (head) {
    const val = head.val
    if (prev !== val && (!head.next || head.next.val !== val)) {
      current.next = { val }
      current = current.next
    }
    prev = val
    head = head.next
  }

  return result.next
}