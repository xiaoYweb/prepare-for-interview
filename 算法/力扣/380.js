/** (middle)
 * 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。 

  insert(val)：当元素 val 不存在时，向集合中插入该项。
  remove(val)：元素 val 存在时，从集合中移除该项。
  getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。

  1. 初始化一个空的集合。
    RandomizedSet randomSet = new RandomizedSet();
  2. 向集合中插入 1 。返回 true 表示 1 被成功地插入。
    randomSet.insert(1);
  3. 返回 false ，表示集合中不存在 2 。
    randomSet.remove(2);
  4. 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
    randomSet.insert(2);
  5. getRandom 应随机返回 1 或 2 。
    randomSet.getRandom();
  6. 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
    randomSet.remove(1);  
  7. 2 已在集合中，所以返回 false 。
    randomSet.insert(2);
  8. 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
    randomSet.getRandom();
 */


class RandomizedSet {
  constructor() {
    this.map = new Map()
  }
  insert(val) {
    const { map } = this;
    if (map.has(val)) {
      return false
    }
    map.set(val, val)
    return true;
  }
  remove(val) {
    return this.map.delete(val)
  }
  getRandom() {
    const array = [...this.map].map(([val]) => val)
    return retRandomItemFromArray(array)
  }
}

function retRandomItemFromArray(arr) {
  const len = arr.length;
  if (len === 0) return
  if (len === 1) return arr[0]
  const i = Math.floor(Math.random() * len)
  return arr[i]
}

const randomSet = new RandomizedSet();
randomSet.insert(1); // true
randomSet.remove(2); // false
randomSet.insert(2);; // true 
randomSet.getRandom(); // 1 || 2
randomSet.remove(1); // true 
randomSet.insert(2); // false 2 已在集合中
randomSet.getRandom(); // 2