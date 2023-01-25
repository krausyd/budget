const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); // to encrypt our passwords in the database

class User extends Model {
    // By extending Model, we are allowing USEr to have all the methods to interact with Database through Sequelize
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                /// newUserData = { id: 1, name: karina, email: krausyd@hey.com, password: superSafePassword }
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                /// newUserData = { id: 1, name: karina, email: krausyd@hey.com, password: superSafePassword }
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false, // IT wont create creationDate, lastUpdateDate
        modelName: 'user',
        freezeTableName: true, //wont add an s at the end of the table name, so its going to be user. If I set to false (default behavior), my table will be named users
    }
);

module.exports = User;