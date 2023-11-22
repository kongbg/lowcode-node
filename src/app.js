import Koa from 'koa'
import './initEnv.js'   // 使用全局变量之前使用dotenv挂载配置
// import './db/index.js'  // 数据库
import Router from './routes/index.js' // 路由文件

const app = new Koa(); // 生成Koa实例

Router.init(app); // 初始化路由

app.listen(process.env.NODE_PORT, ()=>{
    console.log(`This app is listening on http://localhost:${process.env.NODE_PORT}`)
})