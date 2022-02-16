/**
 * 1. render 阶段一开始 就 直接 注册事件 传递 container 取到 parentNode  也就是 rootDom
 * 2. 将所有 浏览器事件 注册/代理到 rootDom 包装 dispatchEvent 函数
 * 3. 触发事件时  从 触发的dom 开始 找到 对应的fiber 节点 创建合成对象 event
 * 4. 递归向上 收集 对应的事件函数 listeners
 * 5. 收集完成 开始 按顺序 触发 函数 
 * 2. resgisterEvents()  -->>  注册事件名称 给 allNativeEvents 赋值 (还有个提取事件)
 * 3. 调用 listenToAllSupportedEvents
 * 
 * ß
 * 
 *
 */