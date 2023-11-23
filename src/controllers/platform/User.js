import BaseController from '../BaseController.js';
import Service from '../../service/platform/PlatformService.js'


class Controller {
  /**
   * 注册
   * @param
   */
  async register (ctx) {
    let { userName, passWord } = ctx.request.body;
    userName = 'admin4'
    passWord = '123456'
    if (!userName || !passWord) {
      ctx.body = BaseController.renderJsonWarn(400, '账号或密码错误！');
      return;
    }

    let isExist = await Service.isExist({
      where: {
        username: userName || ''
      }
    })
    // 不存在，注册新用户
    if (!isExist) {
      let res = await Service.addItem({username: userName, password: passWord});
      if (res) {
        ctx.body = BaseController.renderJsonWarn(200, '注册成功！');
      } else {
        ctx.body = BaseController.renderJsonWarn(400, '注册失败！');
      }
    } else { // 已存在
      ctx.body = BaseController.renderJsonWarn(400, '用户已经存在！');
    }
  }
  /**
   * 获取用户列表
   * @param
   */
  async getPlatformUsers (ctx) {
    const palyload = ctx.request.body;
    let page = palyload.page || 1;
    let pageSize = palyload.pageSize || 10;
  }
}

export default new Controller;