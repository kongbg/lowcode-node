import { Op } from 'sequelize'
import BaseController from '../BaseController.js';
import Service from '../../service/platform/User.js'
import { initPagination, initEditMode } from '../../utils/index.js'
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

    if (data) {
      let userInfo = initEditMode(data);
      let params = {
        id: userInfo.id,
        userName: userInfo.username
      }
      // 生成token
      let token = TokenController.createToken(params, 60 *60);
      // 更新用户信息中token
      let updateRes = await Service.update(
        { token },
        { where: { id: params.id } }
      );
      if (updateRes) {
        delete userInfo.token;
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
    let id = ctx.request.query.id || ctx.payload.id;
    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入用户id');
      return;
    }

    // 且条件查询
    let data = await Service.findOne({
      where: {
        id
      }
    });

    if (data) {
      ctx.body = BaseController.renderJsonWarn(200, '获取成功！', { data });
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

    let { params, page, pageSize, start } = initPagination(query);

    let [data, total] = await Service.findAndCountAll({
      where: params,
      limit: pageSize,
      offset: start
    });

    ctx.body = BaseController.renderJsonWarn(200, '获取成功！', { liat: data, total, page, pageSize });
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

    // 公司id 等于 user id
    if (!params.company_id) {
      params.company_id = params.id;
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

  /**
   * @description: 退出
   * @param {Context} ctx
   */
  async logout (ctx) {
    let { id, token} = ctx.payload;
    let options = {}
    if (id) options.id = id;
    if (!id && token) options.token = token;
    // 删除该用户token
    let updateRes = await Service.update(
      { token: '' },
      { where: options }
    );
    if (updateRes) {
      ctx.body = BaseController.renderJsonWarn(200, '退出成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '退出失败！');
    }
  }

  /**
   * @description: 导入
   * @param {Context} ctx
   */
  async import (ctx) {
    let { data } = ctx.request.body;
    let options = {}
    let res = await Service.import(
      { token: '' },
      { where: options }
    );
    if (res) {
      ctx.body = BaseController.renderJsonWarn(200, '导入成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '导入失败！');
    }
  }

  /**
   * @description: 导出
   * @param {Context} ctx
   */
  async export (ctx) {
    let { data } = ctx.request.body;
    let options = {}
    let res = await Service.export(
      { token: '' },
      { where: options }
    );
    if (res) {
      ctx.body = BaseController.renderJsonWarn(200, '导出成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '导出失败！');
    }
  }
}

export default new Controller;