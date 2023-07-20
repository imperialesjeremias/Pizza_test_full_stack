const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Pizza = sequelize.define(
  'Pizza',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pizza;
const { ingredientes } = require('./ingredientes');
Pizza.belongsToMany(ingredientes, { through: 'pizza_ingredientes' });