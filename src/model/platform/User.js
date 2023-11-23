
import { Model, DataTypes } from 'sequelize';
import Sequelize from '../../db/index'

let tableName = 'platform_account'; // 对于数据库表名
class PlatformAccount extends Model { }
PlatformAccount.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
}, { Sequelize, modelName: tableName});

await Sequelize.sync();

export default PlatformAccount;