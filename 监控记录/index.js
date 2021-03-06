/**
 * 分析 pv 统计策略  
1. 刷新一次 是否增加一次  是 
2. 路由变化一次 是否增加一次 否 (需要配置hash路由)

分析 js错误率的统计策略  --->  出现js错误的 pv / 总pv 
1. 在同一次pv 同一路由中 报错一次  2次   2组实验 校验结果  
1.1 同一次pv 后 一段时间 测试 第一次 1次 上报一次  第二次 连着2次报错(相同错误) 上报一次 基数为 2次  总共三次 错误 
2. 在同一次pv 2不同路由中 报错各 1次 和 2次  2组实验 校验结果   
2.1 不同路由 测试 报错 一次   实验结果 
2.2 统一路由 连续 短时内 报错 2次 上报一次 计数为 2  说明同一错误 短时间内发生 会合并 批量上报 
2.3 实验结果 持续性 测试 总共报错 7次 但是 错误率 还是 为0   pv 为 3  uv 1 js错误 7  js错误率 为 0 %
3. 追加测试 刷新一次 然后 短时间内触发 1次 报错  看是否 有 错误率(发生错误的pv / 总 pv)
3.1 实验结果 错误增加一次 8  错误率为 25%  pv 数量为 4  结论 刷新进入页面短时间发生错误 确实 计算在 当前pv 内 
4. 追加测试 刷新一次 然后 短时间内触发 2次 报错 预期  pv为 5  在pv  js错误率 应该是 2/5 
4.1 实验结果 符合预期 pv为 5  新增2次pv(分别携带 1次js异常  2次js异常)    js错误率 40% 
5. 统计 js错误率的 记录 假设在 pv统计表中  上报sdk 如何设计此处的逻辑  即上报 pv + 短时间的 js错误 和 仅仅上报 js 错误 有和参数不同
5.1 实验结果 参数一致 
5.2 测试过程中 发现 刷新一次 没哟 触发上报错误 线上 给人的反馈是 js错误率 分子分母各加了1  当时 js错误数没有增加  
5.3 再次验证 30min内 重新 刷新刚才的页面  js错误数 0  js错误率 100% pv 1 uv 1
5.4 假设 是因为之前此页面有错误 在 storage中做了标记 刷新后 pv携带了  清空storage 数据 在刷新一次   实验结果 仅增加 pv +1  错误率 分母+1 
5.5 测试 先在此页面 产生错  过2min 在刷新此页面  查看结果  
5.6 测试结果 js错误 数 + 1  其他数值不变   过2min 刷新 页面  js错误率 分子+1 分母+1
Js错误率总结 
1. 一次pv上发生的js错误(一次或多次) / 总pv 
2. 发生一次pv上报后短时间内 && 发生js错误上报 则 js错误率 分子+1 分母+1 pv+1 js错误数+1 
3. 已经发生错误的页面 若 刷新了 则 js错误率 分子+1分母+1 pv+1 js错误数+0
此处提bug给阿里云 等待回复

 */

/**
 * 监控管理系统 功能 

实时大盘 (数据可视化 / 图表) 时间维度下
1. Js异常 ——  总异常次数
2. Api成功率 ——  api接口成功率（load 且 status [200,304] / load error abord 总接口请求数量 ）
3. 页面性能 ——  页面加载总耗时 ？ 是否取平均值
4. 资源加载异常 —— 资源加载异常数
5. 页面分析 —— 访问次数 用户数

监控指标 
1. Js异常
2. api请求
3. 页面性能
4. 资源异常

Page 
  js 异常 （包含 js脚本错误 [promise uncatch]）时间维度
	1.  总异常次数
	2. 异常次数 PV 比 ？
	3. 影响用户 ？产生了JS异常影响到的用户数
	4. 影响用户占比 ？
Api请求
	1. 请求次数
	2. 成功率 （API请求成功次数，计算方式：200 ≤ "HTTP状态码" ＜ 300 或 "HTTP状态码" = 304）
	3. 失败率
	4. 请求耗时 API请求所耗费的时间
	5. 失败影响用户 API请求失败影响到的用户数量 ？
页面性能
	1. 首字节加载时间 
	2. dom ready 时间
	3. 完全加载 耗时
	4. pv
	5. 2s 快开比
	…
资源加载异常
	1. 失败资源数
	2. 影响用户数
	3, 异常次数pv占比
	4. 影响用户占比


监控报警

 */

/**
 * 性能监控 

1.  白屏时间（first Paint Time）——用户从打开页面开始到页面开始有东西呈现为止
2.  首屏时间——用户浏览器首屏内所有内容都呈现出来所花费的时间
3.  用户可操作时间(dom Interactive)——用户可以进行正常的点击、输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作
4.  总下载时间——页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间
5.  dns寻址时间
6.  TCP链接耗时
7.  request请求耗时
8.  页面访问数量

 */

/**
 * 错误监控 

1.  js 脚本运行时 异常
2.  资源加载异常
3. promise 为没有 catch 异常
4. api接口异常 
5. 

 */