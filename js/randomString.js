
function generateRandomString(len = 10) {
  let randomStr = ''
  while (randomStr.length < len) {
    randomStr += Math.random().toString(36).substr(2)
  }
  return randomStr.substr(0, len)
}