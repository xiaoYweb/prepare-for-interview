class LinkedList {
  constructor(val) {
    this.val = val;
  }

}

/**
 * 已有数组 转 链表
 */

function arrayToLinkedList(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const root = new LinkedList(arr[0])
  let preNode = root;                           
  for (let i = 1; i < arr.length; i++) {
    const node = new LinkedList(arr[i])
    preNode.next = node;
    preNode = node;
  }
  return root;
}
// console.log('', arrayToLinkedList([1,2,3]))

/**
 * 链表中 倒数第k个节点
 * 遍历链表的总length
 * 倒数第k个 就是 正数第 len - k + 1
 */

function getKthFromEnd(root, k) {
  if (!root) return
  let len = 1
  let current = root;
  while (current = current.next) {
    len++
  }
  current = root;
  for (let i = 1; i < len - k + 1; i++) {
    current = current.next
  }
  return current;
}

console.log('---',
  getKthFromEnd(
    arrayToLinedList([1, 2, 3]),
    3
  )
)
/**
 * 解法二
 * 双指针
 * 先找到 正数第k个节点
 * 然后 第二个指针 开始 同步向后移动
 * 快的指针到最后一个节点时 慢的指针 刚好指向倒数第k个节点
 */
function getKthFromEnd(root, k) {
  if (!root) return
  let i = 1;
  let slow = root;
  let fast = root;
  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
