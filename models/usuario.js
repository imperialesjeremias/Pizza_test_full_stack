const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Usuario = sequelize.define(
    "usuario",
    {
        nombre: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Usuario;