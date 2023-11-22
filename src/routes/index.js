import BodyParser from 'koa-bodyparser'; // 处理请求头参数
// 引入各个模块路由
import PlatformAccount from './model/PlatformAccount.js';

// 导出初始化路由的方法
export default {
    init: (app) => {
        app.use(BodyParser());
        // 平台用户路由
        app.use(PlatformAccount.routes()).use(PlatformAccount.allowedMethods());
    }
}