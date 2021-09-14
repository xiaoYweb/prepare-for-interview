
export const eventTypeList = [
  'click', 'click',
  'dobuleclick', 'dobuleClick'
]
export const topLevelEventsToReactNames = new Map()

export function registerSimpleEvents() {
  for (let i = 0; i < eventTypeList.length; i++) {
    const leftEventType = eventTypeList[i]; // click  dobuleclick
    const rightEventType = eventTypeList[i + 1] // click  dobuleClick
    const reactEventType =  `on${rightEventType[0].toUpperCase() + rightEventType.slice(1)}`// onClick
    topLevelEventsToReactNames.set(leftEventType, [reactEventType])
    registerTwoPhaseEvent(reactEventType, [leftEventType])
  }
}