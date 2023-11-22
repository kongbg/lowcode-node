import { Sequelize, Model, DataTypes } from 'sequelize';

let { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DIALECT } = process.env;
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: MYSQL_DIALECT
});

class PlatformAccount extends Model { }
PlatformAccount.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize, modelName: 'platform_account'});

await sequelize.sync();

export default PlatformAccount;