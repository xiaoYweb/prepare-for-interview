
/**
 * 浏览器 一帧 做了什么
 * 
 * 1. 处理输入事件  (阻塞事件 input touch wheel 非阻塞 click keyPress )
 * 2. 执行 js 代码
 * 3. 开始帧 处理 window resize scroll 
 * 4. requestAnimationFrame 请求动画帧 
 * 5. Layout 布局 (计算样式 更新布局)
 * 6. Paint 绘制 (计算样式 更新布局)
 * 7. 空闲时间 idle period  此处 可以执行 requestIdleCallback 回调 若时间不够则不会执行
 * 
 */