
/** easy LeetCode 206 翻转链表
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 * 
  输入：head = [1,2,3,4,5]
  输出：[5,4,3,2,1]
  输入：head = [1,2]
  输出：[2,1]
  输入：head = []
  输出：[]
 */

/**
 * 1. 用 next 记录下一个节点
 * 2. 当前节点 next 指向上一个节点 
 * 3. 上一个节点 = 当前节点
 * 4. 当前节点 = 下一个节点
 * 
 */
function reverseList(head) {
  if (!head) return null;
  let prev = null;
  let current = head;
  let next = null;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;

    current = next;
  }
  return prev;
}
