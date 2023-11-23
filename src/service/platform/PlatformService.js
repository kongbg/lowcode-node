import Model from '../../model/platform/User.js'


class PlatformService {
    // findOrCreate 找不到就创建
    // 判断是否已经存在
    async isExist(options={}) {
        let res = await Model.findAll(options);
        console.log('判断是否已经存在: length =', res.length)
        return Boolean(res.length);
    }
    // 新增一个项目
    async addItem(options={}) {
        let res = await Model.create(options);
        console.log('新增一个项目: ', res instanceof Model)
        return res instanceof Model;
    }
    getPlatformUsersByPage() {
        return Model.findOne({
            where: {
                id: ''
            }
        })
    }
}

export default new PlatformService;