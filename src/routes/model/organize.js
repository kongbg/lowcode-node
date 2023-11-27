import Router from 'koa-router';
import Controller from '../../controllers/platform/Organize.js';
const router = new Router({ prefix: '/api' });

/**
 * @api {post} /api/platform/organize/add 新增组织
 * @apiDescription 新增组织
 * @apiName add
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} name 组织名
 * @apiParam {String} pid 父级id
 * @apiParam {String} type 组织类型
 * @apiParam {String} legal 法人
 * @apiParam {String} legal_phone 法人电话
 * @apiParam {String} legal_card_number 法人身份证
 * @apiParam {String} leader 负责人
 * @apiParam {String} leader_phone 负责人电话
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/organize/add',Controller.add);
 
/**
 * @api {post} /api/platform/organize/delete 删除组织
 * @apiDescription 删除组织
 * @apiName delete
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 组织id
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/organize/delete',Controller.deleteOrganize);
 
/**
 * @api {post} /api/platform/organize/info 获取组织信息
 * @apiDescription 获取组织信息
 * @apiName getOrganizeInfo
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
 router.get('/platform/organize/info',Controller.getOrganizeInfo);
 

/**
 * @api {post} /api/platform/organize/update 组织信息更新
 * @apiDescription 组织信息更新
 * @apiName updateUser
 * @apiGroup platform
 * @apiVersion 1.0.0
 * @apiParam {String} id 组织id
 * @apiParam {Object} data 其他参数，待完善
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": 'ok',
 *      "data": null
 *    }
 */
 router.post('/platform/organize/update',Controller.updateOrganizeInfo);
 

/**
 * @api {post} /api/platform/organize/import 组织导入
 * @apiDescription 组织导入
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
 router.post('/platform/organize/import',Controller.import);
 
/**
 * @api {post} /api/platform/organize/export 组织导出
 * @apiDescription 组织导出
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
 router.post('/platform/organize/export',Controller.export);
 
export default router;