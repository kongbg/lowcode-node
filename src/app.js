import Koa from 'koa'
import './initEnv.js'   // 使用全局变量之前使用dotenv挂载配置
import { db } from './db/index.js'  // 数据库链接测试
import Router from './routes/index.js' // 路由文件
import { verifToken } from './middleware/checkToken.js'
let secret = process.env.TOKEN_SECRET;

db(); // 数据库链接测试

const app = new Koa(); // 生成Koa实例

app.use(verifToken({
    key: 'authorization',
    secret: secret,
    whites: ['/api/platform/user/login', '/api/platform/user/register']
}))

Router.init(app); // 初始化路由

app.listen(process.env.NODE_PORT, ()=>{
    console.log(`This app is listening on http://localhost:${process.env.NODE_PORT}`)
})