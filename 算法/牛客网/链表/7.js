

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