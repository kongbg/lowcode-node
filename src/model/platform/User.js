
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/index.js'

let modelName = 'platform_account'; // 模型名称， 最好跟数据库表名一致
class ItemModel extends Model { }

ItemModel.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
}, { sequelize, modelName});


(async()=>{
    // 模型同步
    await ItemModel.sync();
})();

export default ItemModel;