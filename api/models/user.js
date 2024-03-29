//My user model

const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Sequelize.Model{};
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        emailAddress: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },

    }, {sequelize});
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
            fieldName: 'userId',
            allowNull: false,
            },
        });
    };
return User;

}