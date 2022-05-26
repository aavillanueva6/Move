const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 36]
            },
        },
        content: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
);

module.exports = Post;