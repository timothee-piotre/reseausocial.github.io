// models/Guess.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Photo = require('./Photo');
const User = require('./User');

const Guess = sequelize.define('Guess', {
    photoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    guesserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    guessedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relations
Guess.belongsTo(Photo, { foreignKey: 'photoId' });
Guess.belongsTo(User, { foreignKey: 'guesserId' });
Guess.belongsTo(User, { foreignKey: 'guessedUserId' });

module.exports = Guess;
