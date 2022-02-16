/**
 * 对fiber的理解
 * dom-diff
 * react 事件
 * setState 同步异步
 * 虚拟dom  / jsx
 * requestIdleCallback (react 如何实现 requestAnimitionFrame + MessageChannel)
 * 
 * Redux、React-Redux redux-thunk redux-saga dva
 * umi
 */
MessageChannel

/** fiber
 * fiber是一种可执行单元 也是一种数据结构
 * 在浏览器中 页面是 一帧一帧绘制出来的 
 * 一般显示器刷新频率为60帧 意为着 一帧花费16.6秒时间 每一帧包含了 
 * dom输入事件 
 * 定时器回调 
 * 开始帧执行浏览器resize和scroll事件 
 * 执行帧动画 requestAnimitionFrame(raf) 的回调函数callback 
 * layout 
 * paint 
 * 然后是空闲阶段 可以执行requestIdleCallback  回调函数
 * 由于 js主线程 和gui线程是互斥的 同时 每一帧都需要保证 浏览器渲染页面的时间 这样就能保证交互是流畅不卡顿的
 * 在 react 16 之前 协调阶段 会对比 vdom 树 收集effectList 不可中断 由于计算量大占用浏览器资源 造成页面卡顿
 * fiber 主要是让react 在 协调截断可被中断，让出资源交个浏览器渲染，及时响应用户交互
 * 
 * fiber 属性 分为 四大类  
 * 存储状态类的属性  memoizedProps pendingProps memoizedState updateQueue存储着update链表的收尾指针
 * mode  firstEffect lastEffect nextEffect
 * 
 * 标识类  type key stateNode tag alternate
 * 
 * 结构类型 child sibling return 
 * 
 * 任务优先级  lane childLane expirationTime childExpirationTime
 * 
 */

/**
 * dom-diff 分 单节点 和 多节点情况 
 * 单节点
 * 一一对比 若key 不相同 type相同   
 *  ? 老节点全部标记为删除 
 *  : 创建新节点
 * 
 * 若 key不同 type不同 则 
 * 老节点标记为删除 
 * 创建新节点 
 * 
 * 若key相同 type相同 
 *   ? 复用老节点
 *   : 剩余节点标记为删除
 * 
 * 多节点情况
 * 1. 处理节点的更新 属性及类型的更新
 * 2. 处理节点的新增、删除及移动
 * 创建 mp 映射 key = 
 * 第一轮 遍历  若type key 相同 复用老节点 更新属性
 *            若key 相同 type 不同 直接删除老节点 创建新节点
 *            若key不一样 则说明 节点顺序发生变化  跳出第一轮循环
 * 第二轮 建立老节点 mp 映射 key=老节点 
 *    申明变量 lastPlacedIndex = 0
 *    继续上一个位置遍历新节点 若 新节点key 在mp中存在 则找到老节点索引值 oldIndex
 *         若 oldIndex > lastPlacedIndex ?  lastPlacedIndex = oldIndex 标记为更新
 *         若 oldIndex < lastPlacedIndex  标记为移动 
 *          若 mp中没有找到老节点 标记为新增
 *        .... 遍历完后 剩余的老节点标记为删除
 *  
 * 然后 优先处理删除的节点 后 处理 更新 移动 新增
 * 
 */


