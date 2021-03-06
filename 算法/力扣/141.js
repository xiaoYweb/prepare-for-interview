/** easy  环形链表
 * 给定一个链表，判断链表中是否有环。

  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

  如果链表中存在环，则返回 true 。 否则，返回 false 。


  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。

  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。

  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。
 */

/**
* 思路
* 跑步时 快的人和慢的人在某一点相遇
* 快慢指针 判断环形链表 相遇点是 环内
* [1,2,3,4,5] --> 1为入口 [13524 13524] [12345 1]
* [1,2,3,4,5] --> 2为入口 [135 35 35 35] [123 45 23 45]
* [1,2,3,4,5,6] --> 2为入口 [135246 35246] [123456 23456]
* 
* 如何通过快慢指针 找到入口节点(即 尾节点指向的节点)
* [1,2,3,4,5,6] 3位入口 [135 35 35 35 13] [123 45 63 45 63]
* [1,2,3,4,5,6,7] 5为入口 [1357 6 6 1357] [1234 5 6 7567]
*/

function hasCycle(head) {
  if (!head || !head.next) return false;
  let fast = head;
  let slow = head;
  while (true) {
    if (!fast.next || !fast.next.next) {
      return false;
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
}

function hasCycle(head) {
  if (!head) return false
  let slow = head
  let fast = head
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}