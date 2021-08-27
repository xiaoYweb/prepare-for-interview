/**
 * 回溯法也可以叫做回溯搜索法，它是一种搜索的方式
 * 
 * 虽然回溯法很难，很不好理解，但是回溯法并不是什么高效的算法
 * 为回溯的本质是穷举，穷举所有可能，然后选出我们想要的答案\
 * 
 * 回溯法解决的问题
    组合问题：N个数里面按一定规则找出k个数的集合
    切割问题：一个字符串按一定规则有几种切割方式
    子集问题：一个N个数的集合里有多少符合条件的子集
    排列问题：N个数按一定规则全排列，有几种排列方式
    棋盘问题：N皇后，解数独等等


  回溯法解决的问题都可以抽象为树形结构
  回溯法解决的都是在集合中递归查找子集 集合的大小就构成了树的宽度，递归的深度，都构成的树的深度。
 */