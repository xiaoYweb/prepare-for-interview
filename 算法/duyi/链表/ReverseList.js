
/** easy 
 * LeetCode 206 翻转链表
 * @param {ListNode} head 
 * @returns {ListNode}
 */
function reverseList(head) {
  if (!head) return
  let prev = null;
  let current = head;
  let next = null;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return pre;
}