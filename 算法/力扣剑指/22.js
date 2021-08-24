/** easy 链表中倒数第k个节点
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

  例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。


 */
// 1->2->3  1
function getKthFromEnd(head, k) {
  if (!head) return false
  let fast = head
  let slow = head
  while (fast) {
    if (k <= 0) {
      slow = slow.next
    }
    k--
    fast = fast.next
  }
  return slow
}

// 导出第k个就是正数第 len - k + 1 个  
function getKthFromEnd(head, k) {
  let len = 0
  let current = head
  while (current) {
    len++
    current = current.next
  }
  let x = len - k + 1
  current = head;

  for (let i = 1; i < x; i++) {
    current = current.next
    
  }

  return current
}