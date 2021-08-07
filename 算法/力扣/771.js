/** 宝石与石头 (easy) 哈希
 * 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

  J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。

  输入: J = "aA", S = "aAAbbbb"
  输出: 3
  输入: J = "z", S = "ZZ"
  输出: 0
 */

function numJewelsInStones(jewels, stones) {
  const mp = {}
  let count = 0;
  for (let i = 0; i < jewels.length; i++) {
    const jewel = jewels[i];
    mp[jewel] = 1;
  }
  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i];
    count += mp[stone] || 0
  }
  return count;
}

console.log('numJewelsInStones', numJewelsInStones('aA', 'aAAbbbb')) // 3
console.log('numJewelsInStones', numJewelsInStones('z', 'ZZ')) // 0