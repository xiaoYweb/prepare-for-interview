export const isBatchingUpdate = false
export function batchedEventUpdates(fn, a, b) {
  isBatchingUpdate = true
  try {
    return fn(a, b)
  } finally {
    isBatchingUpdate = false
  }
}
