/**
 * 进程 process OS进行资源分配和调度的最小单位，有独立的内存空间
 * 线程 thread  OS进行运算调度的最小单位 共享进程的内存空间
 * 一个进程可以包含多个线程
 * 
 * 
 * 
 * js是单线程 
 * 
 * 浏览器中 Webwork进程 
 * 
 * nodejs 实现多进程 fork cluster 进程间的通讯 
 * 
 * 
 * 多核cpu 适合处理多进程
 */
//
const http = require('http')
const child_process = require('child_process')

const server = http.createServer((req, res) => {
    if (req.url === '/api/getList') {
        console.log('主进程 id', process.pid)

        // 开启 子进程
        const childProcess = child_process.fork('./calculate.js')
        childProcess.send('开始计算')

        childProcess.on('message', data => {
            console.log('主进程 接收到的信息', data)

            res.end('sum is' + data)
        })

        childProcess.on('close', () => {
            console.log('主进程 异常 直接kill')
            childProcess.kill()
            res.end('error')
        })

        // res.end('ok')
    }
})
server.listen(3000, () => {
    console.log('server is listening port 3000')
})
// console.log('由于 有个服务 所以是常驻进程',process.pid)