import Router from 'koa-router';
import Controller from '../../controllers/platform/User.js';
const router = new Router({ prefix: '/api' });

/**
 * @api {post} /api/platform/user/register 注册平台用户
 * @apiDescription 注册平台用户
 * @apiName register
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} userName 用户名
 * @apiParam {String} passWord 用户密码
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 * }
 */
router.post('/platform/user/register',Controller.register);

/**
 * @api {post} /api/platform/user/login 平台用户登录
 * @apiDescription 平台用户登录
 * @apiName login
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} userName 用户名
 * @apiParam {String} passWord 用户密码
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": {
 *              "token": "123",
 *              "userInfo": {
 *                  name: ""   
 *               }
 *          }
 *      }
 * }
 */
router.post('/platform/user/login',Controller.login);

/**
 * @api {post} /api/platform/user/info 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserInfo
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": {
 *          name: '234'
 *      }
 * }
 */
router.get('/platform/user/info',Controller.getUserInfo);

/**
 * @api {post} /api/platform/user/list 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName getUserList
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": {
 *              total: 10,
 *              page: 1,
 *              pageSize: 10,
 *              list: [
 *                  {
 *                      name: '234'
 *                  } 
 *              ]
 *          }
 *      }
 * }
 */
router.get('/platform/user/list',Controller.getUserList);

/**
 * @api {post} /api/platform/user/update 平台用户更新
 * @apiDescription 平台用户更新
 * @apiName updateUser
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 用户id
 * @apiParam {Object} data 其他参数，待完善
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": {
 *              "token": "123",
 *              "userInfo": {
 *                  name: ""   
 *               }
 *          }
 *      }
 * }
 */
router.post('/platform/user/update',Controller.updateUser);

/**
 * @api {post} /api/platform/user/delete 平台用户删除
 * @apiDescription 平台用户删除
 * @apiName delete
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 * }
 */
router.post('/platform/user/delete',Controller.deleteUser);

/**
 * @api {post} /api/platform/user/logout 平台用户登出
 * @apiDescription 平台用户登出
 * @apiName logout
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 * }
 */
router.post('/platform/user/logout',Controller.logout);
export default router;