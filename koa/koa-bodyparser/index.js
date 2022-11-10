
/**
 * app.use(bodyParse())
 * ctx.body...
 * @returns 
 */
function bodyParse() {
    return async (ctx, next) => {
        ctx.response.body = new Promise((resolve, reject) => {
            const arr = []
            ctx.req.on('data', chunk => {
                arr.push(chunk)
            })
            ctx.req.on('end', () => {
                resolve(Buffer.concat(arr))
            })
        })

        await next()
    }
}

module.exports = bodyParse
