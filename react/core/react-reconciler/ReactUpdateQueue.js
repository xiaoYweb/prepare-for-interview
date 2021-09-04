export function createUpdate(expirationTime) {
  return {
    expirationTime: expirationTime, // 过期时间

    tag: 'UpdateState', // UpdateState | ReplaceState | ForceUpdate | Capture
    payload: null, // { element } 初次渲染render  setState {} ()=>({})
    callback: null, // 

    next: null, // 下一个 update 同一setState 可能会有 多个 update 对象 
    nextEffect: null, // 
  };
}



/**
 * 
 */
export function enqueueUpdate(fiber, update) {
  // Update queues are created lazily.
  const alternate = fiber.alternate; // current workingInProgress
  let queue1;
  let queue2;
  if (alternate === null) { // 第一次渲染 render
    // There's only one fiber.
    queue1 = fiber.updateQueue;
    queue2 = null;
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  } else { // 已经更新过了 
    // There are two owners.
    queue1 = fiber.updateQueue;
    queue2 = alternate.updateQueue;
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        queue2 = alternate.updateQueue = createUpdateQueue(
          alternate.memoizedState,
        );
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update);
  } else { //  
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update);
      appendUpdateToQueue(queue2, update);
    } else {
      // Both queues are non-empty. The last update is the same in both lists,
      // because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update);
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update;
    }
  }
}

function appendUpdateToQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

/** UpdateQueue
  {
    // 每次操作完更新之后的`state`
    baseState: State,

    // 队列中的第一个`Update`
    firstUpdate: Update<State> | null,
    // 队列中的最后一个`Update`
    lastUpdate: Update<State> | null,
  }
 */

// 创建的 UpdateQueue fiber.updateQueue = updateQueue
export function createUpdateQueue(baseState) {
  const queue = {
    baseState, // 每次操作完更新之后的`state`
    firstUpdate: null, // 队列中的第一个`Update`
    lastUpdate: null, // 队列中的最后一个`Update`
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  };
  return queue;
}