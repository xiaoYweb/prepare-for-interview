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
    if (!nonDelegatedEvents.has(domEventName)) { // 需要冒泡的事件
      listenToNativeEvent(domEventName, false, container)
    }
    listenToNativeEvent(domEventName, true, container)
  })
}

// 同一个容器上的同一阶段的事件只绑定一次 
function listenToNativeEvent(domEventName, isCapture, container, eventSystemFlags = 0) {
  const listenerSet = getEeventListenerSet(container) // 防止重复绑定
  // dbclick__capture || dbclick__bubble
  const listenerSetKey = getEventListenerSetKey(domEventName, isCapture) 
  if (!listenerSet.has(listenerSetKey)) { // 没有绑定过
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

  // 由插件来提取事件处理函数 所有事件函数 用 dispatchEvent 函数包装 包装 并注册 
  // dispatchEvent 函数 触发 时 获取 fiber 向上 收集 事件函数 于 listeners 数组中 
  // 若 listeners.length > 0 则创建合成事件对象  dispatchQueue.push
  SimpleEventPlugin.extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  )
  // 执行
  processDispatchQueue(dispatchQueue, eventSystemFlags)
}

function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  const isCapturePhase = eventSystemFlags & IS_CAPTURE_PHASE !== 0
  for (let i = 0; i < dispatchQueue.length; i++) {
    const { event, listeners } = dispatchQueue[i];

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
  const captureName = reactName + 'Capture' // onClick + Capture
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
  return listeners
}


function createDispatchListener(instance, listener, lastHostComponent) {
  return {
    instance, listener, lastHostComponent
  }
}