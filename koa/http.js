const http = require('http')


const server = http.createServer(function (req, res) {
  const { method, url } = req
  const body = []
  req.on('data', chunk => {
    body.push(chunk)
  })
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    res.statusCode = 200
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'bacon');
    res.end(body)
    // response.write('<html>');
    // response.write('<body>');
    // response.write('<h1>Hello, World!</h1>');
    // response.write('</body>');
    // response.write('</html>');
    // response.end();
  })

  req.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    res.statusCode = 500
    console.error(err.stack);
  });

})


server.listen(4001, function () {
  console.log('server is listening port 4001')
})