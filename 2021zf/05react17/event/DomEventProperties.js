
export const eventTypeList = [
  'click', 'click',
  'dbclick', 'dobuleClick',
  'keydown', 'keyDown',
  'keypress', 'keyPress',
  'keyup', 'keyUp',
  'mousedown', 'mouseDown',
  // ...
]
export const topLevelEventsToReactNames = new Map()

export function registerSimpleEvents() {
  for (let i = 0; i < eventTypeList.length; i += 2) {
    const leftEventType = eventTypeList[i]; // click  dbclick
    const rightEventType = eventTypeList[i + 1] // click  dobuleClick
    const reactEventType = `on${rightEventType[0].toUpperCase() + rightEventType.slice(1)}`// onClick
    topLevelEventsToReactNames.set(leftEventType, reactEventType) // click => onClick
    registerTwoPhaseEvent(reactEventType, [leftEventType])
  }
}