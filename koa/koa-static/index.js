const path = require('path')
const fs = require('fs').promises
const mime = require('mime')
/**
 * app.use(static(path.resolve(__dirname, 'public')))
 */

function koaStatic(dirname) {
    return async (ctx, next) => {
        let filePath = path.join(dirname, ctx.path)
        try {
            const statObj = await fs.stat(filePath)
            if (statObj.isDirectory) {
                filePath = path.join(filePath, 'index.html')
            }
            ctx.set('Content-Type', mime.getType(filePath) + ';charset=utf-8')
            ctx.body = await fs.readFile(filePath)
        } catch (err) {
            await next()
        }
    }
}

module.exports = koaStatic
