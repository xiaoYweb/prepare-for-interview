

function EntryNodeOfLoop(pHead) {
  if (!pHead) return null

  let slow = pHead
  let fast = pHead
  let hasMeet = false
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = hasMeet
      ? fast.next
      : fast.next.next

    if (slow === fast) {
      if (hasMeet) {
        return fast
      }
      hasMeet = true
      if (slow === head) return head
      fast = head
    }
  }
  return null
}

/**
 * 1 快慢指针  fast 快走2步 slow 慢走1步 若 next 为null 则没有环
 * 2. 若 fast === slow 第一次相遇 则 fast从头开始 并将速度改为 1
 * 3. fast === slow 第 1 次相遇
 *  ? fast从头开始 并将速度改为 1
 *  : slow === head 第 n > 1 次相遇
 *    ? 首位相连的环 return head
 *    : return false || slow
 * 3. 第二次相遇 则为 入口点 前置还有种情况 需要优先判断 即  首位相连的环
 */
function EntryNodeOfLoop(pHead) {
  if (!pHead || !pHead.next) return null // 一个节点 next 指向自己也是有环

  let hasMeet = false
  let slow = phead
  let fast = phead
  while (fast && fast.next) {
    slow = slow.next
    fast = hasMeet ? fast.next : fast.next.next
    if (slow === fast) {
      if (hasMeet) return fast // 第 n>1 相遇 return false || slow
      hasMeet = true
      // 第 1 相遇 
      if (slow === pHead) return pHead // 首位相连的环
      fast = pHead 
    }
  }
  return null
}

function EntryNodeOfLoop(pHead) {
  if (!pHead || !pHead.next) return null 
  let slow = pHead
  let fast = pHead
  let hasMeet = false

  while(fast && fast.next) {
    slow = slow.next
    fast = hasMeet ? fast.next : fast.next.next
    if (fast === slow) {
      if (hasMeet) return fast // 
      hasMeet = true
      if (fast === phead) return fast
      fast = phead
    }
  }
  return null
}