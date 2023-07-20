const {Sequelize} = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '12345678Ji';
const dbName = process.env.DB_NAME || 'test_backend';


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dbHost,
    dbPort,
    dialect: 'mysql',
});

const dbConnect = async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((error) => {
            console.log('Unable to connect to the database', error);
        })
}

module.exports = {
    sequelize,
    dbConnect,
};