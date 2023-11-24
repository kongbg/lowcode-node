import { Op } from 'sequelize'
import BaseController from '../BaseController.js';
import Service from '../../service/platform/PlatformService.js'
import { initPagination } from '../../utils/index.js'
import TokenController from '../token/index.js'


class Controller {
  /**
   * @description: 注册
   * @param {Context} ctx
   */
  async register (ctx) {
    let { userName, passWord } = ctx.request.body;
    if (!userName || !passWord) {
      ctx.body = BaseController.renderJsonWarn(400, '账号或密码错误！');
      return;
    }

    let isExist = await Service.isExist({
      where: {
        username: userName
      }
    })
    // 不存在，注册新用户
    if (!isExist) {
      let data = await Service.addOne({
        username: userName,
        password: passWord
      });
      if (data) {
        ctx.body = BaseController.renderJsonWarn(200, '注册成功！');
      } else {
        ctx.body = BaseController.renderJsonWarn(400, '注册失败！');
      }
    } else { // 已存在
      ctx.body = BaseController.renderJsonWarn(400, '用户已经存在！');
    }
  }

  /**
   * @description: 登录
   * @param {Context} ctx
   */
  async login (ctx) {
    let { userName, passWord } = ctx.request.body;
    if (!userName || !passWord) {
      ctx.body = BaseController.renderJsonWarn(400, '账号或密码错误！');
      return;
    }

    // 且条件查询 [Op.and]
    let data = await Service.findOne({
      where: {
        [Op.and] : [
          {username: userName},
          {password: passWord}
        ]
      }
    });

    if (data.length) {
      let userInfo = data[0];
      let params = {
        id: userInfo.id,
        userName: userInfo.userName
      }
      // 生成token
      let token = TokenController.createToken(params, 60 *60);
      // 更新用户信息中token
      delete userInfo.token;
      let updateRes = await Service.update(
        { token },
        { where: { id: params.id } }
      );
      if (updateRes) {
        ctx.body = BaseController.renderJsonWarn(200, '登录成功！', {userInfo, token});
      } else {
        ctx.body = BaseController.renderJsonWarn(400, '登录失败！');
      }
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '登录失败！');
    }
  }

  /**
   * @description: 获取用户信息
   * @param {Context} ctx
   */
  async getUserInfo (ctx) {
    let { id } = ctx.request.query;
    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入用户id');
      return;
    }

    // 且条件查询
    let data = await Service.findAll({
      where: {
        id
      }
    });

    if (data.length) {
      ctx.body = BaseController.renderJsonWarn(200, '获取成功！', {data });
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '获取失败！');
    }
  }

  /**
   * @description: 获取用户列表
   * @param {Context} ctx
   */
  async getUserList (ctx) {
    const query = ctx.request.query || {};

    let { params, page, pageSize, start} = initPagination(query);

    let [data, total] = await Service.findAndCountAll({
      where: params,
      limit: pageSize,
      offset: start
    });

    ctx.body = BaseController.renderJsonWarn(200, '获取成功！', { list: data, total, page, pageSize});
  }
  /**
   * @description: 删除用户
   * @param {Context} ctx
   */
  async deleteUser (ctx) {
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入用户id');
      return;
    }

    // 且条件查询
    let data = await Service.deleteOne({
      where: {
        id
      }
    });

    if (data) {
      ctx.body = BaseController.renderJsonWarn(200, '删除成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '删除失败！');
    }
  }

  /**
   * @description: 更新用户信息
   * @param {Context} ctx
   */
  async updateUser (ctx) {
    const params = ctx.request.body;
    const id = params.id;
    const selector = {
      where: {
        id: id
      }
    }
    const options = { multi: true };

    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入用户id');
      return;
    }

    let data = await Service.update(
      params,
      selector
    );

    if (data) {
      ctx.body = BaseController.renderJsonWarn(200, '更新成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '更新失败！');
    }
  }
}

export default new Controller;