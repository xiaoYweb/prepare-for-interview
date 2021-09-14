import { registerSimpleEvents, topLevelEventsToReactNames } from './DomEventProperties'
import { IS_CAPTURE_PHASE } from './eventSystemFlags'
import {SyntheticEvent, SyntheticMouseEvent } from './SynTheticEvent'




export function extractEvents(
  dispatchQueue,
  domEventName,
  targetInst,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags,
  targetContainer
) {
  const reactName = topLevelEventsToReactNames.get(domEventName)
  let SyntheticEventCtor
  const reactEventType = domEventName
  // 不同的事件合成事件是不一样的
  switch (domEventName) {
    case 'click':
      SyntheticEventCtor = SyntheticMouseEvent
      break;

    default:
      break;
  }
  const isCapturePhase = eventSystemFlags & IS_CAPTURE_PHASE !== 0
  const listeners = accumulateSinglePhaseListeners(
    targetInst,
    reactName,
    nativeEvent.type,
    isCapturePhase
  )
  if (listeners.length > 0) { // 如果有监听 就创建一个新的合成事件对象
    const event = new SyntheticEventCtor(
      reactName,
      reactEventType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    )
    dispatchQueue.push({
      event,
      listeners
    })
  }
}


export { registerSimpleEvents as resgisterEvents } 
