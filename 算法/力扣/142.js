/** middle  环形链表 II 
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

  说明：不允许修改给定的链表。

  输入：head = [3,2,0,-4], pos = 1
  输出：返回索引为 1 的链表节点
  解释：链表中有一个环，其尾部连接到第二个节点。

  输入：head = [1,2], pos = 0
  输出：返回索引为 0 的链表节点
  解释：链表中有一个环，其尾部连接到第一个节点。

  输入：head = [1], pos = -1
  输出：返回 null
  解释：链表中没有环。
 */

/**
 * 思路
 * 跑步时 快的人和慢的人在某一点相遇
 * 快慢指针 判断环形链表 相遇点是 环内
 * [1,2,3,4,5] --> 1为入口 [13524 1] [12345 1]
 * [1,2,3,4,5] --> 2为入口 [135 35 35 35] [123 45 23 45]
 * [1,2,3,4,5,6] --> 2为入口 [135246 35246] [123456 23456]
 * 
 * 如何通过快慢指针 找到入口节点(即 尾节点指向的节点)
 * [1,2,3,4,5,6] 3位入口 [135 35 35 35 13] [123 45 63 45 63]
 * [1,2,3,4,5,6,7] 5为入口 [1357 6 6 1357] [1234 5 6 7567]
 * 
 * head = [3,2,0,-4], pos = 1
 * slow 3 2 0 -4 走了3步
 * fast 3 0 2 -4 走了6步(是slow的2倍)
 * fast - slow 的步数 就是 环的长度
 * 第一次相遇
 * fast = head 
 * slow -4 2
 * fast 3 2 第一次相遇后 指向head 步长 修改为 1 
 * 
 * [1,2] pos = 0
 * slow 1 2 1 -> 1 2
 * fast 1 1 1 -> 1 2
 * 
 */
function detectCycle(head) {
  if (!head || !head.next) return null;
  let fast = head;
  let slow = head;
  while (true) {
    if (!fast.next || !fast.next.next) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) break
  }
  // 第一次相遇后 
  fast = head;
  while (true) {
    if (fast === slow) return slow;
    fast = fast.next;
    slow = slow.next;
  }
}

function detectCycle(head) {
  if (!head || !head.next) return null;
  let fast = head;
  let slow = head;
  while (true) {
    if (!fast.next || !fast.next.next) {
      return null
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) { // 第一次相遇 存在环
      break
    }
  }
  fast = head;
  while (true) {
    if (fast === slow) { // 第二次相遇 || 
      return slow;
    }
    fast = fast.next;
    slow = slow.next;
  }
}

/**
 * 1,2,3,4 -> 2
 * 1 1 --- 3 2 --- 2 3 --- 4 4 --- 3 2 --- 2 3 --- 4 4
 * 第一次相遇 fast = head 步长 修改为 1 第二次相遇的 索引\节点 即为 入口 
 * 1 1 --- 3 2 --- 2 3 --- 4 4(1,4) --- 2 2
 * 1,2,3,4,5,6 -> 3
 * 1 1 --- 3 2 --- 5 3 --- 3 4 --- 5 5 --- 3 6 --- 5 3 --- 3 4 --- 5 5 
 * 第一次相遇 fast = head 步长 修改为 1 第二次相遇的 索引\节点 即为 入口 
 * 1 1 --- 3 2 --- 5 3 --- 3 4 --- 5 5(1,5) -- 2 6 -- 3 3
 */
function detectCycle(head) {
  if (!head || !head.next) return null
  let slow = head
  let fast = head
  let hasMeet = false
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = hasMeet
      ? fast.next
      : fast.next.next
    if (fast === slow) {
      if (hasMeet) return fast
      hasMeet = true
      if (slow === head) return head
      fast = head
      
    }
  }
  return null
}