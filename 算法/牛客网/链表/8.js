


function FindKthToTail(pHead, k) {
  if (!pHead) return null
  let prev = null
  let current = pHead
  while (k --) {
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
    len ++
    head = head.next
  }
  if (k > len) return null
  let x = len - k
  while (x --) {
    pHead = pHead.next
  }
  return pHead
}
