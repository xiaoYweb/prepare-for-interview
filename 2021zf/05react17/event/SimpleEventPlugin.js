import { registerSimpleEvents, topLevelEventsToReactNames } from './DomEventProperties'
import { accumulateSinglePhaseListeners } from './DOMPluginEventSystem'
import { IS_CAPTURE_PHASE } from './eventSystemFlags'
import { SyntheticEvent, SyntheticMouseEvent } from './SynTheticEvent'



// 提取
export function extractEvents(
  dispatchQueue,
  domEventName,
  targetInst,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags,
  targetContainer
) {
  const reactName = topLevelEventsToReactNames.get(domEventName) // 通过 click => onClick
  let SyntheticEventCtor
  const reactEventType = domEventName // click
  // 不同的事件合成事件是不一样的 合成事件的构造函数也是不一样的
  switch (domEventName) {
    case 'click':
      SyntheticEventCtor = SyntheticMouseEvent
      break;

    default:
      break;
  }
  const isCapturePhase = eventSystemFlags & IS_CAPTURE_PHASE !== 0
  // fiber -> stateNode -> props on...匹配对应的事件名 -> 递归父fiber 收集对应的 事件函数
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
      event, // 合成 事件对象
      listeners // 监听函数
    })
  }
}


export { registerSimpleEvents as resgisterEvents }
