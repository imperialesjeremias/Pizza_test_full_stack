const { ingredientes } = require('../models/ingredientes');
const pizza = require('../models/pizza');
const { Op } = require('sequelize');

const ingredienteController = {
  getAll: async (request, response) => {
    try {
      const result = await ingredientes.findAll();
      response.status(200).json({ msg: 'Lista de ingredientes', result });
    } catch (error) {
      response.status(500).json({ msg: 'Error server', error });
    }
  },
  getById: async (request, response) => {
    try {
      const ingredienteId = request.params.id
      const result = await ingredientes.findByPk(ingredienteId);
      if (!ingredientes)
        return response.status(404).json({ msg: 'Ingrediente no Encontrado' });
      response.status(200).json({ msg: 'Ingrediente', result });
    } catch (error) {
      response.status(500).json({ msg: 'Error server', error });
    }
  },
  createIngrediente: async (request, response) => {
    const { nombre, categoria } = request.body;
    if (!nombre || !categoria)
      return response.status(400).json({ msg: 'Debe llenar todos los campos' });
    try {
      const newIngrediente = await ingredientes.create({ nombre, categoria });
      response.status(201).json({ msg: 'Ingrediente creado', newIngrediente });
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: 'Error server', error });
    }
  },
  updateIngrediente: async (request, response) => {
    try {
      const ingredienteId = request.params.id;
      const result = await ingredientes.findByPk(ingredienteId);
      if (!result)
        return response.status(404).json({ msg: 'Ingrediente no encontrado' });
      const ingredienteUpdated = await ingredientes.update(request.body, {
        where: { id: ingredienteId },
      });
      response
        .status(200)
        .json({ msg: 'Ingrediente actualizado', ingredienteUpdated });
    } catch (error) {
      response.status(500).json({ msg: 'Error server', error });
    }
  },
  deleteIngrediente: async (request, response) => {
    try {
      const ingredienteId = request.params.id;
      const ingrediente = await ingredientes.findByPk(ingredienteId);
      if (!ingrediente) {
        return response.status(404).json({ error: 'Ingrediente no encontrado' });
      }
      const pizzasConIngrediente = await pizza.findAndCountAll({
        include: [{ model: ingredientes, where: { id: ingredienteId } }],
      });
      if (pizzasConIngrediente.count > 0) {
        return response
          .status(409)
          .json({ error: 'No se puede borrar el ingrediente' });
      }
      await ingredientes.destroy({ where: { id: ingredienteId } });
      response.status(200).json({ msg: 'Ingrediente borrado' });
    } catch (error) {
        console.log(error);
        response.status(500).json({error: 'Error interno del servido'});
    }
  },
};

module.exports = ingredienteController;