import BodyParser from 'koa-bodyparser'; // 处理请求头参数
// 引入各个模块路由
// 平台用户相关
import PlatformAccount from './model/PlatformAccount.js';
// 平台用户组织相关
import Organize from './model/Organize.js';
// 平台应用相关
import App from './model/App.js';
// 平台应用分类相关
import AppTag from './model/AppTag.js';

// 导出初始化路由的方法
export default {
    init: (app) => {
        app.use(BodyParser());
        // 平台用户路由
        app.use(PlatformAccount.routes()).use(PlatformAccount.allowedMethods());
        app.use(Organize.routes()).use(Organize.allowedMethods());
        app.use(App.routes()).use(App.allowedMethods());
        app.use(AppTag.routes()).use(AppTag.allowedMethods());
    }
}