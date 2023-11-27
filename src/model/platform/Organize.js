
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/index.js'

let modelName = 'platform_organize'; // 模型名称， 最好跟数据库表名一致
class ItemModel extends Model { }

ItemModel.init({
    name: DataTypes.STRING,
    pid: DataTypes.STRING,
    type: DataTypes.STRING,
    legal: DataTypes.STRING,
    legal_phone: DataTypes.STRING,
    legal_card_number: DataTypes.STRING,
    leader: DataTypes.STRING,
    leader_phone: DataTypes.STRING,
}, { sequelize, modelName});


(async()=>{
    // 模型同步
    await ItemModel.sync();
})();

export default ItemModel;