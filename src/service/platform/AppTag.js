import Model from '../../model/platform/AppTag.js'


class PlatformService {
    // 新增一个项目
    async addOne(options={}) {
        let data = await Model.create(options);
        // console.log('新增一个项目: ', data instanceof Model)
        return  [data instanceof Model, data];
    }
    // 查找项目
    async findAll(options={}) {
        let data = await Model.findAll(options);
        // console.log('查找项目: length =', data.length)
        return [...data];
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
    // 查找tag,没有就创建
    async tagfindOrCreate(options={}) {
        let res = await Model.findOrCreate(options);
        // console.log('resres:', res)
        // console.log('查找tag,没有就创建: length =', data.length)
        // return [json, created];
        return ['json', 'created'];
    }
}

export default new PlatformService;