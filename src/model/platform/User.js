
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/index.js'

let modelName = 'platform_account'; // 模型名称， 最好跟数据库表名一致
let createdAt = 'createdTime';
let updatedAt = 'updatedTime';
let comment = '平台用户表';
let timestamps = true;
class ItemModel extends Model { }

ItemModel.init({
    username: {
		type: DataTypes.STRING,
		allowNull: false,
        comment: '用户名/账号'
	},
    nickname: {
		type: DataTypes.STRING,
        comment: '昵称'
	},
    company_id: {
		type: DataTypes.STRING,
        comment: '公司id'
	},
    company_name: {
		type: DataTypes.STRING,
        comment: '公司名称'
	},
    legal: {
		type: DataTypes.STRING,
        comment: '法人姓名'
	},
    legal_phone: {
		type: DataTypes.STRING,
        comment: '法人手机号'
	},
    credit_code: {
		type: DataTypes.STRING,
        comment: '公司统一社会信用代码'
	},
    phone: {
		type: DataTypes.STRING,
        comment: '手机号'
	},
    password: {
		type: DataTypes.STRING,
		allowNull: false,
        comment: '用户密码'
	},
    token: {
		type: DataTypes.STRING,
        comment: 'token'
	},
    refresh_token: {
		type: DataTypes.STRING,
        comment: '刷新token'
	},
    creator: {
		type: DataTypes.STRING,
        comment: '创建人'
	},
    status: {
		type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '状态'
	},
}, { sequelize, modelName, createdAt, updatedAt, timestamps, comment });


(async()=>{
    // 模型同步
    // await ItemModel.sync() // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    // await ItemModel.sync({ force: true }) // 将创建表,如果表已经存在,则将其首先删除
    await ItemModel.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
})();

export default ItemModel;