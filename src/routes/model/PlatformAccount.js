import Router from 'koa-router';
import Controller from '../../controllers/platform/User.js'
const router = new Router({ prefix: '/api' });

// 注册
router.get('/platform/register',Controller.register)
router.post('/platform/login', Controller.getPlatformUsers);
export default router;