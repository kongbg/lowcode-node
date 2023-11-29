
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/index.js'

let modelName = 'platform_app_tag'; // 模型名称， 最好跟数据库表名一致
class ItemModel extends Model { }

ItemModel.init({
    // 分类名称
    label: {
		type: DataTypes.STRING,
		allowNull: false  //是否可为空
	},
    // 分类类别 // type=1 本组织应用分类 type=2 下级组织应用分类
    type:{
		type: DataTypes.INTEGER, //默认是varchar(255)
		allowNull: false  //是否可为空
	},
    // 组织id
    organize_id:{
		type: DataTypes.INTEGER, //默认是varchar(255)
		allowNull: false  //是否可为空
	},
    // 分类状态
    status: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 1,
    }
}, { sequelize, modelName});

(async()=>{
    // 模型同步
    // await ItemModel.sync() // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    // await ItemModel.sync({ force: true }) // 将创建表,如果表已经存在,则将其首先删除
    // await ItemModel.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
    await ItemModel.sync({ alter: true });
})();

export default ItemModel;