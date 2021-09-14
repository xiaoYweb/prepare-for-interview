
export function addEventCaptureListener(container, eventType, listener) {
  container.addEventListener(eventType, listener, true)
}


export function addEventBubbleListener(container, eventType, listener) {
  container.addEventListener(eventType, listener, false)
}