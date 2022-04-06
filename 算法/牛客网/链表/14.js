/** BM14 链表的奇偶重排 middle
 * 给定一个单链表，请设定一个函数，将链表的奇数位节点和偶数位节点分别放在一起，重排后输出。
注意是节点的编号而非节点的数值。

数据范围：节点数量满足 0 <= n <= 10^5

 ，节点中的值都满足 0 <= val <= 10^3
要求：空间复杂度 O(n)O(n)，时间复杂度 O(n)O(n)

输入：
{1,2,3,4,5,6}
返回值：
{1,3,5,2,4,6}
说明：
1->2->3->4->5->6->NULL
重排后为
1->3->5->2->4->6->NULL

输入：
{1,4,6,3,7}
返回值：
{1,6,7,4,3}
说明：
1->4->6->3->7->NULL
重排后为
1->6->7->4->3->NULL
奇数位节点有1,6,7，偶数位节点有4,3。重排后为1,6,7,4,3
 */

function oddEvenList(head) {
  if (!head) return null
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  let result = {}
  let current = result 
  for (let i = 0; i < arr.length; i += 2) {
    current.next = { val: arr[i] }
    current = current.next
  }

  for (let i = 1; i < arr.length; i += 2) {
    current.next = { val: arr[i] }
    current = current.next
  }

  return result.next
}

function oddEvenList(head) {
  if (!head || !head.next || !head.next.next) return head
  const odd = {}
  const even = {}
  let oddNumber = odd
  let evenNumber = even
  let n = 1
  while(head) {
    const isOdd = n % 2 !== 0 // 是否是奇数个
    if (isOdd) {
      oddNumber.next = { val: head.val }
      oddNumber = oddNumber.next 
    } else {
      evenNumber.next = { val: head.val }
      evenNumber = evenNumber.next 
    }
    n ++
    head = head.next
  }
  oddNumber.next = even.next
  return odd.next
}