
function functionThatReturnTrue() {
  return true
}
function functionThatReturnFalse() {
  return false
}


function createSyntheticEvent(interface) {
  function SyntheticBaseEvent(
    reactName,
    reactEventType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    this._reactName = reactName
    this._targetInst = targetInst
    this.type = reactEventType
    this.target = nativeEventTarget
    this.currentTarget = null // 当前事件源 
    for (const propName in interface) {
      if (Object.hasOwnProperty.call(interface, propName)) {
        this[propName] = nativeEvent[propName]
      }
    }
    this.isDefaultPrevented =  functionThatReturnFalse()
    this.isPropagationStopped =  functionThatReturnFalse()
    return this
  }

  Object.assign(SyntheticBaseEvent.prototype, {
    preventDefault() {
      this.defaultPrevented = true
      const event = this.nativeEvent
      if (event.preventDefault) {
        event.preventDefault()
      } else { // ie 浏览器
        event.returnValue = false
      }
      this.isDefaultPrevented = functionThatReturnTrue
    },
    stopPropagation() {
      const event = this.nativeEvent
      if (event.stopPropagation) {
        event.stopPropagation()
      } else { // ie 浏览器
        event.cancelBubble = true
      }
      this.isPropagationStopped = functionThatReturnTrue
    }
  })

  return SyntheticBaseEvent 
}

const MouseEventInterface = {
  clientX: 0,
  clientY: 0,
}

export const SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface)
export const SyntheticEvent = createSyntheticEvent({})