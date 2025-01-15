const Sequelize = require('sequelize');

const db = {
    host: '127.0.0.1',
    user: 'root',
    database: 'shopsequel',
    password: '123456789',
    dialect: 'mysql'
}

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect
})

module.exports = sequelize;

