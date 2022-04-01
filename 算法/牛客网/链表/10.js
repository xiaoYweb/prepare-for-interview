function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) return null

  const map = new Map()

  while (pHead1) {
    map.set(pHead1, 1)
    pHead1 = pHead1.next
  }

  while (pHead1) {
    if (map.get(pHead1)) return pHead1
    pHead1 = pHead1.next
  }

  return null
}

function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) return null

  let p1 = pHead1
  let p2 = pHead2
  while (p1 !== p2) {
    p1 = (p1 === null ? pHead2 : p1.next)
    p2 = (p2 === null ? pHead1 : p2.next)
  }

  return p1 // 之所以走到这里离 1. 不相交 p1 === p2 === null  2. 相交 p1 === p2 !== null
}
