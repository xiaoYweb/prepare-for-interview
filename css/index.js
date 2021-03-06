/**
 * css 优先级 / 权重
  第一优先级：!important 会覆盖页面内任何位置的元素样式
  1.内联样式，如 style="color: green"，权值为 1000
  2.ID 选择器，如#app，权值为 0100
  3.类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为 0010
  4.标签、伪元素选择器，如 div::first-line，权值为 0001
  5.通配符、子类选择器、兄弟选择器，如*, >, +，权值为 0000
  6.继承的样式没有权值
 */

  /**
   * position 有哪些值，作用分别是什么
   * 
   * static (没有定位) 默认  元素处于正常的文档流中，会忽略 left、top、right、bottom 和 z-index 属性。
   * relative (相对定位)  给元素设置相对于原本位置的定位，元素并不脱离文档流，因此元素原本的位置会被保留，其他的元素位置不会受到影响
   * absolute (绝对定位) 给元素设置绝对的定位  祖先设置了 relative || absolute 属性时 相对 该祖先盒子相对定位  都没有时 相对 body 定位
   * fixed (绝对定位) 相对 body定位 不受祖先定位影响
   * inherit (继承父元素定位属性)
   * sticky () 相对视口定位边界(设置 top left .. 值)  没有超出边界 则 元素在容器内固定在指定位置 超出边界 则 固定视口边界定位  
   */

  /**
   * flex:1 是哪些属性组成的
   * 
   * flex 实际上是 flex-grow、flex-shrink 和 flex-basis 三个属性的缩写。
   * flex-grow 自定义放大比例
   * flex-shrink 自定义缩小比例
   * flex-basis 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间
   */