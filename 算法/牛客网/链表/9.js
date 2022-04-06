

function removeNthFromEnd(head, n) {
  let len = 0
  let current = head
  while (current) {
    len++
    current = current.next
  }

  if (len === 0 || n > len) return

  let x = len - n
  let first = { next: head }
  let prev = { next: head }
  current = head

  while (x--) {
    prev = current
    current = current.next
  }

  if (x === 0) {
    prev = current
    prev.next = null
    current = current.next
    return current
  }

  prev.next = current.next

  return first.next
}


function removeNthFromEnd(head, n) {
  let len = 0
  let current = head
  while (current) {
    len++
    current = current.next
  }
  if (n > len) return

  if (len === n) {
    head = head.next
  } else if (n < len) {
    let x = len - n - 1
    let prev = head
    while (x--) {
      prev = prev.next
    }
    prev.next = prev.next.next
  }

  return head
}

/**
 * 遍历 第一遍 计算总长
 * 若删除节点为 第一个节点 则 直接返回 head.next 
 * 计算 删除节点 为 正数第几个节点
 * 第二次遍历 取的前一位节点 prevNode 与删除节点 currentNode
 * prevNode.next = currentNode.next
 */
function removeNthFromEnd(head, n) {
  if (!head || n === 0) return head
  let current = head  
  let len = 0
  while(current) {
    len ++
    current = current.next
  }
  let x = len - n
  if (x === 0) { // 删除第一个节点
    return head.next
  }
  current = head
  let prev = null
  while(x--) {
    prev = current 
    current = current.next
  }
  // current 为要删的节点 prev 为前一节点 (删的节点 = 中间节点 || 最后节点)
  prev.next = current.next
  return head
}

