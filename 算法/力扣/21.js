/** 合并两个有序链表 (easy)
 * 将两个 升序 链表合并为一个
 *  新的 升序 链表并返回。
 * 新链表是通过拼接给定的两个链表的所有节点组成的
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
  输入：l1 = [1,2,4], l2 = [1,3,4]
  输出：[1,1,2,3,4,4]

  输入：l1 = [], l2 = []
  输出：[]

  输入：l1 = [], l2 = [0]
  输出：[0]
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
  let head = null;
  let current = null;
  while (isValid(l1) && isValid(l2)) {
    if (l1.val < l2.val) {
      if (!head) { // 第一次进入 head === null current === null  
        current = head = l1;
      } else {
        current.next = l1;
        current = l1;
      }
      l1 = l1.next;
    } else {
      if (!head) { // 第一次进入 head === null current === null  
        current = head = l2;
      } else {
        current.next = l2;
        current = l2;
      }
      l2 = l2.next;
    }
  }
  while (isValid(l1)) {
    if (!head) {
      current = head = l1;
    } else {
      current.next = l1;
      current = l1;
    }
    l1 = l1.next;
  }
  while (isValid(l2)) {
    if (!head) {
      current = head = l2;
    } else {
      current.next = l2;
      current = l2;
    }
    l2 = l2.next;
  }
  return head;
}

function isValid(node) {
  return node && node.val
}

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
function fn() {
  const l1 = new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(4)
    )
  )
  const l2 = new ListNode(
    1,
    new ListNode(
      3,
      new ListNode(4)
    )
  )
  // printNode(l1)
  // printNode(l2)
  return mergeTwoLists(l1, l2)
}
function printNode(node) {
  while (node) {
    console.log('node', node.val)
    node = node.next
  }
}
console.log('fn', printNode(fn()))


~(function fn1() {
  function mergeTwoLists(l1, l2) {
    const result = []
    let l = null;
    let r = null;
    while (l1.length && l2.length) {
      l = l1.shift()
      r = l2.shift()
      l < r
        ? result.push(l, r)
        : result.push(r, l)
    }
    while (l1.length) {
      result.push(l1.shift())
    }
    while (l2.length) {
      result.push(l2.shift())
    }
    return result;
  }

  const l1 = [1, 2, 4]
  const l2 = [1, 3, 4]
  console.log('[1, 2, 4], [1, 3, 4]', mergeTwoLists(l1, l2))

  console.log('[], []', mergeTwoLists([], []))
  console.log('[], []', mergeTwoLists([], [0]))
})
// console.log('fn1', )
