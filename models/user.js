const sequelizedB = require('../utils/database');
const Sequelize = require('sequelize');


// const User = sequelizedB.define('user',
//     {
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             primaryKey: true
//         },
//         email: {
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     });

// ========UPDATE CODE 
const User = sequelizedB.define('user', {
    id: {
        type: Sequelize.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;