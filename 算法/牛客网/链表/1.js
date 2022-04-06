/**
 * BM1 反转链表
 * 给定一个单链表的头结点pHead(该头节点是有值的，比如在下图，它的val是1)，长度为n，反转该链表后，返回新链表的表头
 * 输入：
{1,2,3}
返回值：
{3,2,1}
输入：
{}
返回值：
{}
说明：
空链表则输出空  
 */
function ReverseList() {
  if (pHead == null || pHead.next == null) {
    return pHead;
  }
  let prev = null
  let current = null
  while (pHead) {
    current = pHead.next
    pHead.next = prev

    prev = pHead
    pHead = current
  }
  return prev
}
function ReverseList(pHead) {
  if (!pHead || !pHead.next) return pHead

  let prev = null
  let current = null
  while (pHead) {
    prev = current // 前一个
    current = pHead // 当前
    pHead = pHead.next // 下一个

    current.next = prev // 当前的下一个指向前一个  修改指针
  }

  return current
}
