import BaseController from '../BaseController.js';
import PlatformService from '../../service/platform/PlatformService.js'

class Controller {
  // /**
  //  * 获取用户列表
  //  * @param
  //  */
  // static async getPlatformUsers (ctx) {
  //   const palyload = ctx.request.body;
  //   let page = palyload.page || 1;
  //   let pageSize = palyload.pageSize || 10;

  //   let { rows, count } = await PlatformService.getPlatformUsersByPage(page, pageSize);
  //   ctx.body = BaseController.renderJsonSuccess(200, 'ok', {
  //     list: rows,
  //     totals: count,
  //   });
  // }

  /**
   * 登录接口
   * @param {Context} ctx
   * @memberof controller
   */
  static async login(ctx) {
    const params = ctx.request.body;
    ctx.body = BaseController.renderJsonSuccess(200, 'ok', {data:[]});
  }
}
export default Controller;
