

function createNode(val) {
  return {
    val, next: null
  }
}

// [1,2,3]
function createListNode(arr) {
  let head = { }
  let current = null
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const node = createNode(val)
    if (!head.next) {
      head.next = node
    } else {
      current.next = node
    }
    current = node
  }
  return head.next
}


module.exports = createListNode