import Router from 'koa-router';
import Controller from '../../controllers/platform/User.js'
const router = new Router({ prefix: '/api' });

router.post('/platform/login', Controller.login);
export default router;