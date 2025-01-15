const sequelizedB = require('../utils/database');
const Sequelize = require('sequelize');


const User = sequelizedB.define('user',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
module.exports = User;