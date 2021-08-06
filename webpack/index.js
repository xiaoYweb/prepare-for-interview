/**
 * webpack 原理
 * 1. 初始化参数 从配置文件和 Shell 语句中读取及合并参数 
 * 2. 根据参数 初始化 Compiler 对象 加载所有配置的插件，执行对象的 run 方法开始执行编译
 * 3. 根据配置中的 entry 找出所有的入口文件 调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，递归操作此步骤
 * 4. 完成模块编译 得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
 * 5. 输出资源 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，(这步是可以修改输出内容的最后机会)  
 * 6. 输出完成 确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
 */