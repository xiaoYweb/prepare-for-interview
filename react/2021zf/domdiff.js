/**
 * dom-diff 是一个对比老的fiber和新的jsx数组的，生成新fiber的过程
 * 1. 只做同级/同一层比较
 * 2. 不同类型 直接销毁 重新创建 type不同
 * 3. key 表示移动元素
 * 
 * flag 操作标记
 *  插入(2) Placement
 *  更新 (4) Update
 *  插入并更新 (6) PlacementAndUpdate
 *  删除 (8) Deletion
 */

/**
 * 单节点 - 新的子节点只有一个元素
 *
 * 1. 是否存在老的dom元素
 * 2. key和type是否相同
 */

/** 单节点情况 1
 * type 或 key 不一样
 * 调和阶段 老的节点需要标记为删除  新的节点标记为插入
 *    commit 提交阶段
 *        removeChild(h1)
 *        appendChild(h2)
  <div>
    <h1 key="null"></h1>
  </div>

  <div>
    <h2 key="null"></h2>
  </div>
 */

/** 单节点情况 2
 * 多节点变为单节点
 * 若key 相同 type不相同  不进行后续对比直接吧老节点全部删除 然后添加新节点
 * 循环对比 type 和 key 是否相同 不相同则删除
  <div>
    <h1 key="h1"></h1> 标记为删除
    <h2 key="h2"></h2> 复用老节点
    <h3 key='h3'></h3> 删除剩下的节点
    ...
  </div>

  <div>
    <h2 key="h2"></h2>
  </div>
 */

/** 单节点情况 3
 * 新老节点 key type 一样 复用老节点的 dom 元素 和 fiber 对象
 *    属性有没有变更
 *        ? 标记为更新
 */




/**
 * 新的节点有多个子节点
 * 会进行2次遍历
 * 1. 处理节点的更新 属性及类型的更新
 * 2. 处理节点的新增、删除及移动
 * 尽量少的移动 若移动 地位高的不动 地位低的移动
 */

/** 多节点 情况 1
 *
  <ul>
    <li key="a">a</li>
    <li key="b">b</li>
    <li key="c">c</li>
    <li key="d">d</li>
  </ul>
  <ul>
    <li key="a">a - new</li>
    <li key="b">b - new</li>
    <li key="c">c - new</li>
    <li key="d">d - new</li>
  </ul>
  操作步骤
  1. 更新 a
  2. 更新 b
  3. 更新 c
  4. 更新 d
 */

/** 多节点 情况 2
 *
  <ul>
    <li key="a">a</li> fiber
    <li key="b">b</li>
    <li key="c">c</li>
    <li key="d">d</li>
  </ul>
  <ul>
    <div key="a">a - new</div> jsx节点 type不一样 标记为删除
    <li key="b">b - new</li>
    <li key="c">c - new</li>
    <li key="d">d - new</li>
  </ul>
  操作步骤
  1. 删除 a
  2. 插入 div a
  3. 更新 b
  4. 更新 c
  5. 更新 d
 */


/** 多节点 情况 3 移动
 * 1. 第一轮遍历发现 key 不一样 跳出第一轮循环   说明 顺序已经发生变化
 * 2. 建立map映射 key = 对应fiber 键值对 
 * 3. 继续上一个位置 遍历新节点 是否存在于 map中
 *      ? 位置遍历  老节点可以复用 标记为更新
 *      : 标记为删除
 * lastPlacedIndex = 0
  <ul>
    <li key="a">a</li> fiber     oldIndex
    <li key="b">b</li>
    <li key="c">c</li>
    <li key="d">d</li>
    <li key="e">e</li>
    <li key="f">f</li>
  </ul>
  <ul>
    <li key="a">a - new</li>     newIndex 
    <li key="c">c - new</li>     map[c]获取 老fiber节点 获取 oldIndex 若 > lastPlacedIndex 则 
                                 lastPlacedIndex = oldIndex 不移动 标记为更新
    <li key="e">e - new</li>      
    <li key="b">b - new</li>     map[b].oldIndex < lastPlacedIndex  移动 
    <li key="g">g - new</li>     map[b] 不存在 则 新增
                                 ...遍历完成后    剩余的标记为 删除
  </ul>
  操作步骤
  1. 删除 d
  2. 删除 f
  3. 更新 a
  4. 更新 c
  5. 更新 e
  6. 移动并更新 b
  7. 插入 g
 */

