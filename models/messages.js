// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Message extends Model
// { };

// Message.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primarykey: true,
//             autoincrement: true,
//         },
//         message_body: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         sent_page: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//             references: {
//                 model: 'user',
//                 key: 'id',
//             },
//         },
//         date_created: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'message',
//     }
// );

// module.exports = Message;