import Router from 'koa-router'
import controller from '../../controllers/PlatformAccount.js'
const router = new Router({ prefix: '/api' });

router.post('/login', controller.login);
export default router