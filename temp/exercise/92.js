// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
const list = [
  {
    id: '1',
    name: '浙江省',
    children: [
      {
        id: '11',
        name: '杭州',
        children: [
          { id: '111', name: '萧山' },
          { id: '112', name: '拱墅' },
        ],
      }
    ],
  },
  {
    id: '2',
    name: '广东省',
    children: [
      {
        id: '21',
        name: '深圳',
        children: [
          { id: '211', name: '南山区' },
          { id: '212', name: '城北' },
        ],
      }
    ],
  }
]
const value = '112';
const fn = (val, arr = list, result = []) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const { id, children } = item;

    if (id === val) {
      result.push(id)
      break
    }
    if (Array.isArray(children)) {
      result.push(id)
      const recordLen = children.length;
      const res = fn(val, children, result)
      if (res.length > recordLen) break
      result.shift(id)
    }
  }


  return result
}

fn(value) // 输出 [1， 11， 112]