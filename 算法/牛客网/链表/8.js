


function FindKthToTail(pHead, k) {
  if (!pHead) return null
  let prev = null
  let current = pHead
  while (k--) {
    current = current.next
    if (!current) return null
  }
  if (!current) return null
  prev = pHead

  while (current) {
    prev = prev.next
    current = current.next
  }

  return prev
}

function FindKthToTail(pHead, k) {
  let len = 0
  let head = pHead
  while (head) {
    len++
    head = head.next
  }
  if (k > len) return null
  let x = len - k
  while (x--) {
    pHead = pHead.next
  }
  return pHead
}


// ----------------------------------------------找到导出 第k个节点 
/**
 * 
 * 快慢指针
 */
function findNthFromEnd(head, n) {
  if (!head || n === 0) return
  let current = head
  let i = 0
  while (head) {
    if (i === n) {
      current = current.next
    } else {
      i++
    }
    head = head.next
  }

  return current
}
/**
 * 遍历获得总长  len
 * len - n
 * 遍历第二次到 
 */

function findNthFromEnd(head, n) {
  let current = head
  let len = 0
  while (current) {
    len++
    current = current.next
  }
  let x = len - n
  if (x < 0) return null
  while (x--) {
    head = head.next
  }
  return head
}