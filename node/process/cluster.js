const http = require('http')
const cpuCoreLength = require('os').cpus().length
const cluster = require('cluster')

// 根据核数 创建 子进程
// 集群的主进程
if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        const element = array[i];
        cluster.fork() // 开启 子进程
    }
    cluster.on('exit', worker => {
        console.log('子进程退出 ')
        cluster.fork() // 进程守护
    })
} else {
    // 集群的子进程
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end('done')
    })
    // 多个子进程 会共享一个 tcp连接  所以服务端口一样 不会冲突
    server.listen(3000)
}