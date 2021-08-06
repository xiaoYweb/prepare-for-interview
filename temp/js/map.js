/** Map 键值对的集合
  Map.prototype.size
  Map.prototype.has(key)
  Map.prototype.get(key)
  Map.prototype.set(key, val)
  Map.prototype.keys()：返回键名的遍历器。
  Map.prototype.values()：返回键值的遍历器。
  Map.prototype.entries()：返回所有成员的遍历器。
  Map.prototype.forEach()：遍历 Map 的所有成员。

  需要特别注意的是，Map 的遍历顺序就是插入顺序。

  const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
  ]);

  for (let key of map.keys()) {
    console.log(key);
  }
  // "F"
  // "T"

  for (let value of map.values()) {
    console.log(value);
  }
  // "no"
  // "yes"

  for (let item of map.entries()) {
    console.log(item[0], item[1]);
  }
  // "F" "no"
  // "T" "yes"

  // 或者
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"

  // 等同于使用map.entries()
  for (let [key, value] of map) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"

  上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
  map[Symbol.iterator] === map.entries

  map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
  });
 */