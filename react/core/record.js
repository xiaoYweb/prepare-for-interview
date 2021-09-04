/**
 * 1. react.createElement  --->  reactElement 元素 | vdom | 对象
 * 
 * 
 * 
 * 2. 创建更新阶段 ReactDom.render()
 *    创建fiberRoot  rootFiber   
 *    fiberRoot.current = rootFiber
 *    rootFiber.stateNode = fiberRoot
 *    rootFiber.return = null
 *    rootFiber.child = fiber  ---- <App /> 
 *    计算过期时间 computeExpirationForFiber expirationTime
 *    创建 更新对象 createUpdate update 
 *    update.payload = { element }  || partialState || () => partialState
 *    创建 更新队列 enqueueUpdate UpdateQueue
 *    
 * 
 * 3. 协调阶段 scheduleWork
 *    找到更新对应的 fiberRoot 节点(setState forceUpdate 传的是本身的fiber节点 所以需要向上查找)
 *    重置stack (公共变量)
 *    符合条件 请求任务调度
 *    scheduleWorkToRoot 向上查找 fiberRoot 顺便修改状态 触发更新的fiber 过期时间若小于则更新  
 *    requestWork
 *      将 rootFiber 节点加入调度队列中
 *      判断是否是批量更新
 *      根据 expirationTime 判断调度类型
 * 
 *    addRootToSchedule
 *    scheduleCallbackWithExpirationTime // 异步调度
 * 
 *    performWork()
 *      deadline !== null 
 *        ? 
 *        : performWorkOnRoot
 * 
 * 
 *    renderRoot
 *      调用 workLoop进行循环单元更新 遍历整个 fiberTree 判断节点 updateQueue是否由内容 决定是否更新
 *      捕获错误并进行处理 (预期 和 不可预期) 
 *      走完流程后进行善后
 *  
 *    wookLoop
 *    performUnitOfWork  
 *    beginWork
 *      判断组件更新是否可以优化
 *      根据节点类型分发处理
 *      根据 expirationTime 等信息判断节点更新是否可以跳过
 *    
 */

/**
 * container._reactRootContainer = fiberRoot
 * fiberRoor_internalRoot = fiberRoor
 * fiberRoor.current = rootFiber
 * rootFiber.child = fiber ---- <App />
 * 
 * container.current = rootFiber
 */


/**
 * expirationTime 种类
 * 
 * Sync   1
 * Async 模式
 * 指定context
 */

/**
 * ClassComponent setState forceUpdate  针对某个节点 创建更新
 */

/**
 * fiber schedule 
 * 
 * scheduleWork -> addRootToScheduler (react 应用中存在多个应用节点 root 多次调用 ReactDom.render)
 * .. -> requestWork -> sync 
 *  ? performSyncWork  -- without deadline --> performWork
 *  : scheduleCallBackWithExprirationTime -> 异步调度过程
 * 
 * ..异步调度过程  -> scheduleDeffedCallback -> add callbackList -> requestIdleCallback(自实现)
 *    ->   -> performAsyncWork with deadline  --> performWork
 * 
 * performWork  without deadline 
 *  ? 执行下一步提交更新 // 
 *  : performWorkOnRoot -> findHighestPriorityRoot ->  
 * 
 */