const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const CATEGORIAS = [
    {label:"Basico", value: "Basico"},
    {label: "Premium", value: 'Premium'},
];

const ingredientes = sequelize.define(
    'ingredientes',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.ENUM(CATEGORIAS.map((cat) => cat.value)),
            allowNull: false,
        },
    },{
        timestamps: true,
    }
);

const getCategorias = () => CATEGORIAS.map((cat) => cat.label);

module.exports = {
    ingredientes,
    getCategorias,
};