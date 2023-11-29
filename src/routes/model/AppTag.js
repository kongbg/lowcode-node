import Router from 'koa-router';
import Controller from '../../controllers/platform/AppTag.js';
const router = new Router({ prefix: '/api' });

/**
 * @api {post} /api/platform/apptag/add 新增应用分类
 * @apiDescription 新增应用分类
 * @apiName add
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} label 应用分类名
 * @apiParam {String} organize_id 组织id
 * @apiParam {String} status 状态
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/apptag/add',Controller.add);
 
/**
 * @api {post} /api/platform/apptag/delete 删除应用分类
 * @apiDescription 删除应用分类
 * @apiName delete
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 应用分类id
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/apptag/delete',Controller.deleteAppTag);

/**
 * @api {post} /api/platform/apptag/list 获取所有应用分类
 * @apiDescription 获取应用分类信息
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
router.get('/platform/apptag/list',Controller.getAppTagList);

/**
 * @api {post} /api/platform/apptag/update 应用分类信息更新
 * @apiDescription 应用分类信息更新
 * @apiName updateUser
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 应用分类id
 * @apiParam {Object} data 其他参数，待完善
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/apptag/update',Controller.updateAppTagInfo);
 

/**
 * @api {post} /api/platform/apptag/import 应用分类导入
 * @apiDescription 应用分类导入
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
 router.post('/platform/apptag/import',Controller.import);
 
/**
 * @api {post} /api/platform/apptag/export 应用分类导出
 * @apiDescription 应用分类导出
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
 router.post('/platform/apptag/export',Controller.export);
 
export default router;