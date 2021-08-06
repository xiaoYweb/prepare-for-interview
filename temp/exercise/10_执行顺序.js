function sleep(wait = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, wait);
  })
}

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
  // await sleep(0)
  // console.log('async2 end');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0)

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');

// 情况一
// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'async1 end'
// 'promise2'
// 'setTimeout'

// 情况二
// 'script start'
// 'async1 start'
// 'async2'
// 'promise1'
// 'script end'
// 'promise2'
// 'setTimeout'
// 'async2 end'
// 'async1 end'


function fn(str) {
  const mp = {}
  for (let i = 0; i < str.length; i++) {
    const val = str[i];
    mp[val] = (mp[val] || (mp[val] = 0)) + 1
  }
  return mp;
}

