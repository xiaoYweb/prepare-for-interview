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


/**
 * hooks
 * 
 * beginWork(current, workInProgress, renderExpirationTime) 
 *  -> updateFunctionComponent(current, workInProgress, Component, nextProps, renderExpirationTime) 
 *    -> prepareToUseHooks(current, workInProgress, renderExpirationTime)
 *    -> nextChildren = Component(nextProps, context);
 *    -> finishHooks(Component, nextProps, nextChildren, context)
 *    -> reconcileChildren(current, workInProgress,nextChildren,renderExpirationTime)
 * 
 * 
 * current.memoizedState -> firstCurrentHook 
 * fiber.memoizedState 挂载 hook链表
 * hook.queue.last 挂载这 update链表 
 * 全局变量 firstCurrentHook 指向一个 
 * currentlyRenderingFiber = 函数执行过程中 对应的当前 fiber
 * firstCurrentHook = 函数执行过程中 第一个 hoos函数生成的 hook 
 * 一个 hook函数 生成一个  hook对象 (链表结构)
 * hook属性(queue queue.last指向最后一个更新对象update memoizedState用于放回的值 记录上一次的值)
 * dispatchAction 闭包存储 所属 fiber quque队列 触发更新时 可以 直接计算  
 * 
 * userEffect 
 * hook.memoizedState = effect = { tag, create, destroy, inputs, next }
 * fiber.updateQueue = componentUpdateQueue = { lastEffect: '存储着effectList 最后一个effect' }
 * commitHookEffectList 中会使用到 fiber.updateQueue
 * (commitBeforeMutationLifeCycles,commitPassiveHookEffects,commitLifeCycles,commitWork)
 * 
 * 
 * useRef 创建一个对象 { current: initialValue } 挂载hook对象下  hook.memoizedState = ref
 */