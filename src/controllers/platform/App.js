import { Op } from 'sequelize'
import BaseController from '../BaseController.js';
import Service from '../../service/platform/App.js'
import { initPagination } from '../../utils/index.js'

class Controller {
  /**
   * @description: 新增应用
   * @param {Context} ctx
   */
  async add (ctx) {
    let params = ctx.request.body;

    let { id } = ctx.payload;
    params.user_id = id;

    let data = await Service.addOne({
      ...params
    });
    if (data) {
      ctx.body = BaseController.renderJsonWarn(200, '新增成功！');
    } else {
      ctx.body = BaseController.renderJsonWarn(400, '新增失败！');
    }
  }

  /**
   * @description: 获取应用信息
   * @param {Context} ctx
   */
  async getAppInfo (ctx) {
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
   * @description: 获取所有应用
   * @param {Context} ctx
   */
 async getAppList (ctx) {
  const query = ctx.request.query || {};

  let data = await Service.findAll();

  ctx.body = BaseController.renderJsonWarn(200, '获取成功！', { list: data, total, page, pageSize});
}
  /**
   * @description: 删除应用
   * @param {Context} ctx
   */
  async deleteApp (ctx) {
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入app id');
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
   * @description: 应用信息更新
   * @param {Context} ctx
   */
  async updateAppInfo (ctx) {
    const params = ctx.request.body;
    const id = params.id;
    const selector = {
      where: {
        id: id
      }
    }
    const options = { multi: true };

    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请传入app id');
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