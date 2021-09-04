


const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = ReactInstanceMap.get(inst);
    const currentTime = requestCurrentTime();
    const expirationTime = computeExpirationForFiber(currentTime, fiber); // 计算过期时间

    const update = createUpdate(expirationTime); // 创建更新对象
    update.payload = payload; // partialState or (state) => partialState

    enqueueUpdate(fiber, update); // 更新对象添加更新队列 
    scheduleWork(fiber, expirationTime); // 开始调度
  },
  enqueueForceUpdate(inst, callback) {
    const fiber = ReactInstanceMap.get(inst);
    const currentTime = requestCurrentTime();
    const expirationTime = computeExpirationForFiber(currentTime, fiber);

    const update = createUpdate(expirationTime);
    update.tag = ForceUpdate; // 更新类型 标记 

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
};