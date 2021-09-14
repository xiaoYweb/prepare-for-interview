import { allNativeEvents } from './EventRegistry'
import { IS_CAPTURE_PHASE } from './eventSystemFlags'
import { getEeventListenerSet } from './ReactDomComponentTree'
import * as SimpleEventPlugin from './SimpleEventPlugin'
import { addEventCaptureListener, addEventBubbleListener } from './EventListener'
import { dispatchEvent } from './ReactDomEventListener'
import { HostComponent } from './ReactWorkTags'
import getListener from './getListener'

// 注册事件名称 给 allNativeEvents 赋值
SimpleEventPlugin.resgisterEvents()

export const nonDelegatedEvents = new Set(['scroll']) // 不需要绑定冒泡的 事件
// 事件名称注册完成后 绑定事件处理函数到容器container上
export function listenToAllSupportedEvents(container) {
  allNativeEvents.forEach(domEventName => {
    if (!nonDelegatedEvents.has(domEventName)) {
      listenToNativeEvent(domEventName, false, container)
    }
    listenToNativeEvent(domEventName, true, container)
  })
}

// 同一个容器上的同一阶段的事件只绑定一次 
function listenToNativeEvent(domEventName, isCapture, container, eventSystemFlags = 0) {
  const listenerSet = getEeventListenerSet(container)
  const listenerSetKey = getEventListenerSetKey(domEventName, isCapture)
  if (!listenerSet.has(listenerSetKey)) {
    if (isCapture) {
      eventSystemFlags |= IS_CAPTURE_PHASE // 4
    }
    addTrappedEventListener(container, domEventName, eventSystemFlags, isCapture)
    listenerSet.add(listenerSetKey)
  }
}

function getEventListenerSetKey(domEventName, isCapture) {
  return `${domEventName}__${isCapture ? 'capture' : 'bubble'}`
}

function addTrappedEventListener(container, domEventName, eventSystemFlags, isCapture) {
  const listener = dispatchEvent.bind(null, domEventName, eventSystemFlags, container)
  if (isCapture) {
    addEventCaptureListener(container, domEventName, listener)
  } else {
    addEventBubbleListener(container, domEventName, listener)
  }
}



export function dispatchEventForPluginEventSystem(
  domEventName,
  nativeEvent,
  targetInst,
  targetContainer
) {
  const nativeEventTarget = nativeEvent.target
  const dispatchQueue = []

  // 由插件来提取事件处理函数
  SimpleEventPlugin.extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  )
  processDispatchQueue(dispatchQueue, eventSystemFlags)
}

function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  const isCapturePhase = eventSystemFlags & IS_CAPTURE_PHASE !== 0
  for (let i = 0; i < dispatchQueue.length; i++) {
    const { event, listeners } = dispatchQueue[i];
    if (event.isPropagationStopped()) { // 阻止了冒泡 所以 后续 捕获和冒泡 都不会继续执行了
      return
    }

    processDispatchQueueItemsInOrder(event, listeners, isCapturePhase)
  }
}
function processDispatchQueueItemsInOrder(event, listeners, isCapturePhase) {
  if (isCapturePhase) {
    for (let i = listeners.length - 1; i >= 0; i--) {
      const { currentTarget, listener } = listeners[i];
      if (event.isPropagationStopped()) {
        return
      }
      execDispatch(event, listener, currentTarget)
    }
  } else {
    for (let i = 0; i < listeners.length; i++) {
      const { currentTarget, listener } = listeners[i];
      if (event.isPropagationStopped()) {
        return
      }
      execDispatch(event, listener, currentTarget)
    }
  }
}
function execDispatch(event, listener, currentTarget) {
  event.target = currentTarget
  listener(event)
  event.target = null
}

export function accumulateSinglePhaseListeners(
  targetFiber,
  reactName,
  nativeType,
  inCapturePhase
) {
  const captureName = reactName + 'Capture'
  const reactEventName = inCapturePhase ? captureName : reactName

  const listeners = []
  let instance = targetFiber
  let lastHostComponent = null
  while (instance) {
    const { stateNode, tag } = instance
    if (tag === HostComponent && stateNode) {
      lastHostComponent = stateNode
      const listener = getListener(instance, reactEventName)

      listener && listeners.push(createDispatchListener(instance, listener, lastHostComponent))
    }
    instance = instance.return

  }
}


function createDispatchListener(instance, listener, lastHostComponent) {
  return {
    instance, listener, lastHostComponent
  }
}