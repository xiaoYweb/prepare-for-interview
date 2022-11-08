

function getSum() {
    let n = 0

    for (let i = 0; i < 10000 * 10000; i++) {
        n ++
    }
    // n() // 异常调用 模拟子进程报错退出
    return n
}

process.on('message', data => {
    console.log("子进程 id", process.pid, data)

    const sum = getSum()

    // 发送消息到主进程
    process.send(sum)
})