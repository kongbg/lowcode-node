import Router from 'koa-router';
import Controller from '../../controllers/platform/App.js';
const router = new Router({ prefix: '/api' });

/**
 * @api {post} /api/platform/app/add 新增应用
 * @apiDescription 新增应用
 * @apiName add
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} name 应用名
 * @apiParam {String} type 应用类型
 * @apiParam {String} icon 图标
 * @apiParam {String} status 状态
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/app/add',Controller.add);
 
/**
 * @api {post} /api/platform/app/delete 删除应用
 * @apiDescription 删除应用
 * @apiName delete
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 应用id
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/app/delete',Controller.deleteApp);

/**
 * @api {post} /api/platform/app/info 获取应用信息
 * @apiDescription 获取应用信息
 * @apiName getAppInfo
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
 *    }
 */
 router.get('/platform/app/info',Controller.getAppInfo);
 
/**
 * @api {post} /api/platform/app/list 获取所有应用
 * @apiDescription 获取应用信息
 * @apiName getApplist
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
 *    }
 */
router.get('/platform/app/list',Controller.getAppList);

/**
 * @api {post} /api/platform/app/update 应用信息更新
 * @apiDescription 应用信息更新
 * @apiName updateUser
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 应用id
 * @apiParam {Object} data 其他参数，待完善
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/app/update',Controller.updateAppInfo);
 

/**
 * @api {post} /api/platform/app/import 应用导入
 * @apiDescription 应用导入
 * @apiName platformUserImport
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
 router.post('/platform/app/import',Controller.import);
 
/**
 * @api {post} /api/platform/app/export 应用导出
 * @apiDescription 应用导出
 * @apiName platformUserExport
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": {
 *          name: '文件名',
 *          data：[]
 *      }
 *    }
 * }
 */
 router.post('/platform/app/export',Controller.export);
 
export default router;