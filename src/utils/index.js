/**
   * @description: 统一处理分页信息
   * @param {*} query  传入参数
   * @param {number} size 默认每页条数 10
   * @return {object} params 查询条件
   * @return {number} page 当前页
   * @return {number} pageSize 每页条数
   * @return {number} start 开始查询位置
   */
export const initPagination = (query, size=10) => {
    let params = { ...query };
    let page = Number(params.page) || 1;
    let pageSize = Number(params.pageSize) || size;
    delete params.page;
    delete params.pageSize;
    return {
        params,
        page,
        pageSize,
        start: (page - 1) * pageSize
    }
}


// 获取树形结构数据
class getNeedModule{
    constructor(Needs, options){
        this.options = options;
        this.Needs = Needs;
    }
    async getNeedsTree(){
        let rootNeeds = await this.Needs.findAll({
            where: this.options
        })
        let _rootNeeds = rootNeeds.map(item => {
            return  Object.assign(item.toJSON(), { children: [] })
        });

        await this.getChildNeeds(_rootNeeds);

        return _rootNeeds;
    }
    async getChildNeeds(rootNeeds){
        let expendPromise = [];
        rootNeeds.forEach(item => {
            expendPromise.push(this.Needs.findAll({
                where : {
                    pid : item.id
                }
            }))
        })
        let childs = await Promise.all(expendPromise);
        for (let  [idx, item] of childs.entries()) {
            if (rootNeeds[idx].children) {
                rootNeeds[idx].children.push(item[0]);
            } else {
                rootNeeds[idx].children = [item[0]]
            };
        }
        return rootNeeds;
    }
}
export const NeedModule = getNeedModule;
