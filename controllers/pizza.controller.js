const pizza = require("../models/pizza");
const { ingredientes } = require("../models/ingredientes");
const { Op } = require("sequelize");
const { request } = require("express");
const req = require("express/lib/request");

const pizzaController = {
    getAll: async (request, response) => {
        try {
            const pizzas = await pizza.findAll({
                where: {
                    estado: {
                        [Op.eq]: "Activo",
                    },
                },
            });
            response.status(200).json({ msg: "Lista de pizzas", pizzas });
        } catch (error) {
            response.status(500).json({ msg: "Error server", error });
        }
    },
    getById: async (request, response) => {
        try {
            const pizzaId = request.params.id;
            const pizzas = await pizza.findByPk(pizzaId);
            if (!pizzas) return response.status(404).json({ msg: "Pizza no encontrada" });
            response.status(200).json({ msg: "Piiza", pizzas });
        } catch (error) {
            response.status(500)({ msg: "Error server", error });
        }
    },
    createPizza: async (request, response) => {
        const { nombre, precio, estado } = request.body;
        if (!nombre || !precio || !estado)
            return response.status(400).json({ msg: "debe llenar todos los campos" });
        try {
            const existingPizza = await pizza.findOne({ where: { nombre } });
            if (existingPizza) {
                return response
                    .status(400)
                    .json({ msg: "Ya existe una pizza con el mismo nombre" });
            }
            const newPizza = await pizza.create({ nombre, precio, estado });
            response.status(201).json({ msg: "Pizza creada", newPizza });
        } catch (error) {
            response.status(500).json({ msg: "Error server", error });
        }
    },
    updatePizza: async (request, response) => {
        try {
            const pizzaId = request.params.id;
            const result = await pizza.findByPk(pizzaId);
            if (!result) return response.status(404).json({ msg: "Pizza no encontrada" });
            const pizzaUpdated = await pizza.update(request.body, {
                where: { id: pizzaId },
            });
            if (request.body.estado === "Inactivo") {
                await result.setIngredientes([]);
            }
            response.status(200).json({ msg: "Pizza actualizada", pizzaUpdated });
        } catch (error) {
            response.status(500).json({ msg: "Error server", error });
        }
    },
    addIngredientes: async (request, response) => {
        const { pizzaId, ingredienteId } = request.params;
        console.log(pizzaId, ingredienteId);

        try {
            const resultPizza = await pizza.findByPk(pizzaId);
            const ingrediente = await ingredientes.findByPk(ingredienteId);

            if (!resultPizza || !ingrediente) {
                return response
                    .status(404)
                    .json({ msg: "Pizza o ingrediente no encontrado" });
            }
            // agregar ingrediente a la pizza
            await resultPizza.addIngrediente(ingrediente);

            const ingredientesPizza = await resultPizza.getIngredientes();

            response
                .status(200)
                .json({ msg: "Ingrediente agregado a la pizza", ingredientesPizza });

        } catch (error) {
            response.status(500).json({ msg: "Error server", error });
        }
    },
    getDetalles: async (request, response) => {
        const result = await pizza.findOne({
            where: { id: request.params.id },
            include: [
                {
                    model: ingredientes,
                    attributes: ["id", "nombre", "categoria"],
                    // si se utiliza una tabla itermedia'join table'para la relacion
                    through: { attributes: [] },
                },
            ],
            attributes: ["id", "nombre", "precio", "estado"],
        });
        const pizzaDetalles = {
            id: result.id,
            nombre: result.nombre,
            precio: result.precio,
            estado: result.estado,
            ingredientes: result.ingredientes.map((ingrediente) => ({
                id: ingrediente.id,
                nombre: ingrediente.nombre,
                categoria: ingrediente.categoria,
            })),
        };
        if (!pizzaDetalles) {
            return response.status(404).json({ msg: "Pizza no encontrada" });
        }
        response.status(200).json(pizzaDetalles);
    },
    removeIngredientes: async (request, response) => {
        const { pizzaId, ingredienteId } = request.params;

        try {
            const pizzaInstance = await pizza.findByPk(pizzaId);
            const ingredienteInstance = await ingredientes.findByPk(ingredienteId);

            if (!pizzaInstance || !ingredienteInstance) {
                return response
                    .status(404)
                    .json({ msg: "Pizza o ingrediente no encontrado" });
            }
            await pizzaInstance.removeIngrediente(ingredienteInstance);
            response.status(200).json({ msg: "Ingrediente eliminado de la pizza" });
        } catch (error) {
            response.status(500).json({ msg: "Error server", error });
        }
    },
};

module.exports = pizzaController