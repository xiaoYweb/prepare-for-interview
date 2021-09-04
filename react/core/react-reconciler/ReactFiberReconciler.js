import { computeExpirationForFiber } from './ReactFiberScheduler'
import { createFiberRoot } from './ReactFiberRoot';


export function createContainer(containerInfo, isConcurrent) {
  return createFiberRoot(containerInfo, isConcurrent); //  ---todo - >> fiber
}

export function updateContainer(element, container) {
  const current = container.current; // container === fiberRoot   current  === 根fiber
  const currentTime = requestCurrentTime();
  const expirationTime = computeExpirationForFiber(currentTime, current); // ---todo - >>

  return updateContainerAtExpirationTime(
    element,
    container,
    expirationTime,
  );

}

export function updateContainerAtExpirationTime(element, container, expirationTime) {
  const current = container.current;
  return scheduleRootUpdate(current, element, expirationTime);
}

function scheduleRootUpdate(current, element, expirationTime) {

  // 标记应用更新地点
  const update = createUpdate(expirationTime); // ---todo - >>
  update.payload = {
    element
  };

  enqueueUpdate(current, update); //  ---todo - >> 

  scheduleWork(current, expirationTime); // 开始进行任务调度 ---todo - >>

  return expirationTime;
}