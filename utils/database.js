const Sequelize = require('sequelize');

const db = {
    host: '127.0.0.1',
    port: '3308',
    user: 'root',
    database: 'expresshop',
    password: 'admin@root',
    dialect: 'mysql'
}

const sequelize = new Sequelize (db.database, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect
})

module.exports = sequelize;

