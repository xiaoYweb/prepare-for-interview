
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