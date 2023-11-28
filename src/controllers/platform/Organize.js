import { Op } from 'sequelize'
import BaseController from '../BaseController.js';
import Service from '../../service/platform/Organize.js'
import { initPagination } from '../../utils/index.js'
import { NeedModule } from  '../../utils/index.js'

class Controller {
  /**
   * @description: 新增组织
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
   * @description: 获取组织树形结构
   * @param {Context} ctx
   */
  async getOrganizeTree (ctx) {
    let { id } = ctx.payload;
    if (!id) {
      ctx.body = BaseController.renderJsonWarn(400, '请检查登录状态');
      return;
    }

    // 且条件查询
    let params = {
      [Op.and] : [
        {user_id: id},
        {pid: 0}
      ]
    }
    let needModule = new NeedModule(Service, params)
    
    let data = await needModule.getNeedsTree()
    // console.log('rrrr:', data)
    // let data = await Service.findAll({
    //   where: {
    //     user_id: id
    //   }
    // });

    if (Array.isArray(data)) {
      ctx.body = BaseController.renderJsonWarn(200, '获取成功！', {data});
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