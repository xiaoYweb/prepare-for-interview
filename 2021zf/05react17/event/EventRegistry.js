
export const allNativeEvents = new Set()
export const registerationNameDependencies = {}
function listenNativeEvent(type,) {

}

/**
 * onChange: [input, keydown, change]
 * 注册两个阶段（ 捕获、冒泡）的事件
 * @param {*} registrationName 注册名称
 * @param {*} dependencies 依赖事件
 */
export function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies)
  registerDirectEvent(registrationName + 'Capture', dependencies)
}

function registerDirectEvent(registrationName, dependencies) {
  // registerationNameDependencies[registrationName] = dependencies
  for (let i = 0; i < dependencies.length; i += 2) {
    const dependency = dependencies[i];
    allNativeEvents.add(dependency)
  }
}