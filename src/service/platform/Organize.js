import Model from '../../model/platform/Organize.js'


class PlatformService {
    // findOrCreate 找不到就创建
    // 判断是否已经存在
    async isExist(options={}) {
        let data = await Model.findAll(options);
        // console.log('判断是否已经存在: length =', data.length)
        return Boolean(data.length);
    }
    // 新增一个项目
    async addOne(options={}) {
        let data = await Model.create(options);
        // console.log('新增一个项目: ', data instanceof Model)
        return data instanceof Model;
    }
    // 查找一个项目
    async findOne(options={}) {
        let data = await Model.findOne(options);
        // console.log('查找一个项目: length =', data.length)
        return data;
    }
    // 查找项目
    async findAll(options={}) {
        let data = await Model.findAll(options);
        // console.log('查找项目: length =', data.length)
        return [...data];
    }
    // 查找项目(分页)
    // TODO: 排序
    async findAndCountAll(options={}) {
        let data = await Model.findAndCountAll(options);
        let { rows, count } = data;
        // console.log('查找项目(分页): count =', count, rows.length)
        return [ rows, count ];
    }
    // 更新项目
    async update(value, selector={where:{}}, options={}) {
        let data = await Model.update(value, selector, options);
        // console.log('更新项目: ', data)
        return Boolean(data[0]);
    }
    // 删除项目
    async deleteOne(options={}) {
        let data = await Model.destroy(options);
        // console.log('删除项目: ', data)
        return Boolean(data);
    }
    // 导入
    async import(options={}) {
        return Boolean(true);
    }
    // 导出
    async export(options={}) {
        return Boolean(true);
    }
}

export default new PlatformService;