import Router from 'koa-router';
import Controller from '../../controllers/platform/User.js';
const router = new Router({ prefix: '/api' });

// 注册
router.post('/platform/user/register',Controller.register);
// 登录
router.post('/platform/user/login',Controller.login);
// 获取用户信息
router.get('/platform/user/info',Controller.getUserInfo);
// 获取用户列表
router.get('/platform/user/list',Controller.getUserList);
// 更新
// 删除用户
router.post('/platform/user/update',Controller.updateUser);
// 删除用户
router.post('/platform/user/delete',Controller.deleteUser);
export default router;