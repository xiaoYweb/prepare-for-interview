const fs = require('fs');

const promisify = (asyncFn) => {
  return (...args) => {
    return new Promise((res, rej) => {
      args.push((err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
      asyncFn.apply(this, args);
    });
  }
}
const readFilePromisify = promisify(fs.readFile);
readFilePromisify('./2.js', 'utf-8').then(data => {
  console.log(data);
});
