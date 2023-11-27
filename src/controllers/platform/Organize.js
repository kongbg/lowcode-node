import { Op } from 'sequelize'
import BaseController from '../BaseController.js';
import Service from '../../service/platform/Organize.js'
import { initPagination } from '../../utils/index.js'

class Controller {
  /**
   * @description: 新增组织
   * @param {Context} ctx
   */
  async add (ctx) {
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
    // 不存在，新增组织
    if (!isExist) {
      let data = await Service.addOne({
        username: userName,
        password: passWord
      });
      if (data) {
        ctx.body = BaseController.renderJsonWarn(200, '新增成功！');
      } else {
        ctx.body = BaseController.renderJsonWarn(400, '新增失败！');
      }
    } else { // 已存在
      ctx.body = BaseController.renderJsonWarn(400, '组织已经存在！');
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
   * @description: 获取组织信息
   * @param {Context} ctx
   */
  async getOrganizeInfo (ctx) {
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
   * @description: 删除组织
   * @param {Context} ctx
   */
  async deleteOrganize (ctx) {
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
   * @description: 组织信息更新
   * @param {Context} ctx
   */
  async updateOrganizeInfo (ctx) {
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