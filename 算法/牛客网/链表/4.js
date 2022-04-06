/**
 * BM4 合并两个排序的链表
 * 输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。
 */
function merge(pHead1, pHead2) {
  const head = {}
  let current = head

  while (pHead1 && pHead2) {
    if (pHead1.val <= pHead2.val) {
      current.next = pHead1
      current = pHead1
      pHead1 = pHead1.next
    } else {
      current.next = pHead2
      current = pHead2
      pHead2 = pHead2.next
    }
  }
  // 一定存在单个情况
  current.next = pHead1 ? pHead1 : pHead2;

  return head.next
}


function merge(pHead1, pHead2) {
  const result = {}
  let current = result
  while (pHead1 && pHead2) {
    if (pHead1.val < pHead2.val) {
      current.next = pHead1
      pHead1 = pHead1.next
    } else {
      current.next = pHead2
      pHead2 = pHead2.next
    }
    current = current.next
  }
  // 还剩一个链表有数据 或 都为 null
  current.next = pHead1 ? pHead1 : pHead2

  return result.next
}