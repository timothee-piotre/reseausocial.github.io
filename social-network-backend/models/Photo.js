// models/Photo.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Group = require('./Group');

const Photo = sequelize.define('Photo', {
    uploaderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAnonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relations
Photo.belongsTo(User, { foreignKey: 'uploaderId' });
Photo.belongsTo(Group, { foreignKey: 'groupId' });

module.exports = Photo;
