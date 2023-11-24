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