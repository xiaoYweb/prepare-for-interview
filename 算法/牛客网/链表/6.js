/**
 * 判断链表是否有环 
 */

function hasCycle(head) {
  let fast = head
  let slow = head

  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }

  return false
}