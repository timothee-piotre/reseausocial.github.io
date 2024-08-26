// models/Group.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relation Many-to-Many avec User
Group.belongsToMany(User, { through: 'GroupMembers' });
User.belongsToMany(Group, { through: 'GroupMembers' });

module.exports = Group;
