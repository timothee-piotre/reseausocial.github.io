// models/Vote.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Photo = require('./Photo');
const User = require('./User');

const Vote = sequelize.define('Vote', {
    photoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    voterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relations
Vote.belongsTo(Photo, { foreignKey: 'photoId' });
Vote.belongsTo(User, { foreignKey: 'voterId' });

module.exports = Vote;
