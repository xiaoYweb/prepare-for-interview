


/**
 * react中的渲染流程
 * 
 * scheduler
 * reconcile
 * 
 */
 const root = document.getElementById('root')
 let workingInprogress
 const TAG_ROOT = 'TAG_ROOT'
 const TAG_HOST = 'TAG_HOST'
 const Placement = 'Placement'
 let rootFiber = {
   tag: TAG_ROOT,
   key: 'root',
   stateNode: root
 }
 function workLoop(deadline) {
   while (deadline.timeRemaining() > 1 && workingInprogress) {
     workingInprogress = performUnitOfWork(workingInprogress)
   }
   commitRoot(rootFiber)
 }
 
 function commitRoot(rootFiber) {
   let currentEffect = rootFiber.firstEffect
   while (currentEffect) {
     const flags = currentEffect.flags
     switch (flags) {
       case Placement:
         commitPlacement(currentEffect)
         break;
 
       default:
         break;
     }
   }
 }
 
 function commitPlacement(currentEffect) {
   const parent = currentEffect.return.stateNode // 父节点
   parent.appendChild(currentEffect.stateNode)
 }
 
 
 function performUnitOfWork(workingInprogress) {
   beginWork(workingInprogress) // 
   if (workingInprogress.child) {
     return workingInprogress.child
   }
 
 
   while (workingInprogress) {
     // 最小的子fiber节点完成 后  父fiber也完成了
     completeUnitOfWork(workingInprogress)
     if (workingInprogress.sibling) {
       return workingInprogress.sibling
     }
     workingInprogress = workingInprogress.return
   }
 }
 
 // fiber节点结束时需要创建真实dom元素
 function completeUnitOfWork(workingInprogress) {
   let stateNode
   switch (workingInprogress.tag) {
     case TAG_HOST:
       stateNode = createStateNode(workingInprogress)
       break;
 
     default:
       break;
   }
   // 在完成工作单元的时候判断当前的fiber节点有没有对应的dom操作
   makeEffectList(workingInprogress)
 }
 /**
  * 包含有副作用的节点 对于上一次渲染
  * effectList = {
  *  fristEffect: a
  *  lastEffect: c
  * }
  * a.nextEffect = b 
  * b.nextEffect = c
  */
 function makeEffectList(completeWork) { // 
   const returnFiber = completeWork.return
   if (returnFiber) {
     if (!returnFiber.firstEffect) { // 父 fiber 的 firstEffect处理 
       returnFiber.firstEffect = completeWork.firstEffect
     }
     if (completeWork.lastEffect) {
       if (returnFiber.lastEffect) { // 父 fiber 的 firstEffect及它的nextEffect处理
         returnFiber.lastEffect.nextEffect = completeWork.firstEffect
       }
       returnFiber.lastEffect = completeWork.lastEffect
     }
     
     // effectList为何要把 fiber节点也链接上 ??
     if (completeWork.flags) { 
       if (returnFiber.lastEffect) {
         returnFiber.lastEffect.nextEffect = completeWork
       } else {
         returnFiber.firstEffect = completeWork
       }
       returnFiber.lastEffect = completeWork
     }
   }
 }
 
 function createStateNode(fiber) {
   if (fiber.tag === TAG_HOST) {
     const stateNode = document.createElement(fiber.type)
     fiber.stateNode = stateNode
   }
   return fiber.stateNode
 }
 
 function beginWork(workingInprogress) {
   const nextChildren = workingInprogress.props.children // reactEl -> fiber
   return reconcileChildren(workingInprogress, nextChildren)
 }
 
 function reconcileChildren(returnFiber, nextChildren) {
   let previousFiber
   let firstFiber
   for (let i = 0; i < nextChildren.length; i++) {
     const fiber = createFiber(nextChildren[i]);
     fiber.return = returnFiber
     fiber.flags = Placement
     if (!firstFiber) {
       firstFiber = fiber
 
     } else {
       previousFiber.sibling = fiber
     }
     previousFiber = fiber
   }
   returnFiber.child = fiber
 }
 function createFiber() {
 
 }
 
 