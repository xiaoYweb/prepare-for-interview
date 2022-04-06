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


function hasCycle(head) {
  if (!head || !head.next) return false
  let fast = head
  while (fast && fast.next) {
    fast = fast.next.next
    head = head.next
    if (head === fast) return true
  }
  return false
}