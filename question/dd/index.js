/** 
 * webpack 原理
  1. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
  2. 确定入口：根据配置中的 entry 找出所有的入口文件；
  3. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
  4. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
  5. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
  6. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。


  babel 原理

  babel的转译过程分为三个阶段：parsing、transforming、generating
  1. ES6代码输入
  2. babylon 进行解析得到 AST
  3. plugin 用 babel-traverse 对 AST 树进行遍历转译,得到新的AST树
  4. 用 babel-generator 通过 AST 树生成 ES5 代码

  虚拟 DOM 的理解

  写过webpack loader 或者插件吗


  讲讲你写的 babel 插件


  redux 的原理

  redux 做状态管理和发布订阅模式有什么区别
 */

/**
 * http 与 tcp 的关系
 * tcp 可以建立多个连接吗？
 * 介绍一下为什么要有 三次握手，四次挥手
 * 写过 babel 插件吗？用来干啥的？怎么写的 babel 插件
 * 
 * 研究过 React 的运行时吗？
 */

/** node 
 * 介绍一下你对中间件的理解
 * 怎么保证后端服务稳定性，怎么做容灾
 * 1. 多个服务器部署
   2. 降级处理，服务挂了，从缓存里面取。

   怎么让数据库查询更快
 */