import BaseController from './BaseController.js';

export default class controller extends BaseController {
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
