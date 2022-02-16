function fn1() {
  setTimeout(() => {
    // 此处忘记啥代码了
  }, 0);

  setTimeout(() => {
    // 此处忘记啥代码了
  }, 0);

  function fn() {
    return new Promise(resolve => {
      console.log('y')
      resolve('u')
    })
  }

  async function func() {
    const p = await fn()
    // 关键点 1: 下面的打印书序 是 先 u 后 r
    Promise.resolve('r').then(res => {
      console.log(res)
    })
    console.log(p) // 
  }

  func()
  console.log('o')
}
// fn1()

function fn2() {
  setTimeout(function () {
    console.log("1");
  }, 0);
  async function async1() {
    console.log("2");
    const data = await async2();
    console.log("3");
    new Promise(res => {
      res('立刻调用')
    }).then((val) => {
      console.log(val)
    })
    return data;
  }
  async function async2() {
    return new Promise((resolve) => {
      console.log("4");
      resolve("async2的结果");
    }).then((data) => {
      console.log("5");
      return data;
    });
  }
  async1().then((data) => {
    console.log("6");
    console.log(data);
  });
  new Promise(function (resolve) {
    console.log("7");
    // resolve()  // 注释 ? 没有调用resolve 则 8 不会打印 : 打印顺序 
  }).then(function () {
    console.log("8");
  });

}

// 2 4 7  5 (8) 3 立刻调用 6 async2的结果  1
// 注册微任务 
fn2()

function fn3() {
  const p1 = new Promise((res) => {
    res()
  })
  const p2 = new Promise((res) => {
    res()
  })
  
  p2.then(() => {
    console.log('p2')
  })
  p1.then(() => {
    console.log('p1')
  })
}

// fn3() // p2 p1