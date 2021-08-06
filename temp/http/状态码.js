const delay = (ms) => new Promise((resolve) => setTimeout(() => {
  console.log(`延迟 ${ms} 秒`)
  resolve()
}, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"), // fn
  () => console.log("b"), // fn
  subFlow, // p []
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")], // fn []
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

function createFlow(list) {
  const result = list.flat(Infinity)
  async function run(cb) {
    const fnList = this;
    for (let i = 0; i < fnList.length; i++) {
      const fn = fnList[i];
      if (typeof fn === 'function') {
        const val = fn()
        await val;
      }
    }
    cb()
  }
  result.run = run;
  return result;
}


 // await 接受 promise 和  普通值

async function func1() { // await 接受 promise 和  普通值
  const p1 = Promise.resolve(111)
  const p2 = Promise.resolve(222)
  const p3 = Promise.resolve(333)
  const res = await [p1, p2, p3]
  return res
}

async function func2() {
  const delay = (ms) => new Promise((resolve) => setTimeout(() => {
    console.log(`延迟 ${ms} 秒`)
    resolve()
  }, ms));
  const p1 = delay(1000)
  const p2 = 2
  await p1
  await p2
}