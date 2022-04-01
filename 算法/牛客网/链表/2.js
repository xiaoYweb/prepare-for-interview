/**
 * 描述
将一个节点数为 size 链表 m 位置到 n 位置之间的区间反转，要求时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)。
例如：
给出的链表为 1\to 2 \to 3 \to 4 \to 5 \to NULL1→2→3→4→5→NULL, m=2,n=4m=2,n=4,
返回 1\to 4\to 3\to 2\to 5\to NULL1→4→3→2→5→NULL.

数据范围： 链表长度 0 < size \le 10000<size≤1000，0 < m \le n \le size0<m≤n≤size，链表中每个节点的值满足 |val| \le 1000∣val∣≤1000
要求：时间复杂度 O(n)O(n) ，空间复杂度 O(n)O(n)
进阶：时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)

{1,2,3,4,5},2,4
{1,4,3,2,5}

{5},1,1
{5}
 */
const createListNode = require("../utils")


function reverseList(head) {
  let prev = null
  let current = null
  let start = head
  while (head) {
    current = head.next
    head.next = prev

    prev = head
    head = current
  }
  return [start, prev]
}

// console.log(reverseList(demo1NodeList))
// {1,2,3,4,5},2,4
// {1,4,3,2,5}
console.log(reverseBetween(createListNode([1, 2, 3, 4, 5]), 2, 4))

// {3,5},1,2
// {5,3}
// console.log(reverseBetween(createListNode([3, 5]), 1, 2))
function reverseBetween1(head, m, n) {
  // write code here
  if (m - n === 0) return head
  let root = { next: head }
  head = root
  let x = m
  let left = null
  while (x--) {
    left = head
    head = head.next
  }
  x = n - m // > 0
  while (x--) {
    head = head.next
  }
  let right = head.next
  head.next = null

  const [prev, next] = reverseList(left.next)
  left.next = next
  prev.next = right

  return root.next
}

function reverseBetween(head, left, right) {
  if (left === right) return head
  let prev, next
  let start = { next: head }
  head = start
  let x = left
  while (left--) {
    prev = head
    head = head.next
  }
  x = right - left
  while (x--) {
    // 1 - 2 - 3 - 4 - 5
    // 1 - 3 - 2 - 4 - 5
    // 1 - 3 - 4 - 2 - 5
    // 当前遍历  head -- 2
    next = head.next // 3 next 指向当前遍历下一个节点

    prev.next = next // 1 -> 3

    head.next = next.next // 2 -> 4

    next.next = head // 3 - 2

    prev = next // 前指针 移动一位
  }

  return start.next
}