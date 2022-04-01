

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
    while (x --) {
      prev = prev.next
    }
    prev.next = prev.next.next
  }

  return head
}