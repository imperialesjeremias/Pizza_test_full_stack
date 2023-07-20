const { Router } = require('express');
const pizzaController = require('../controllers/pizza.controller');
const {authenticateToken, checkType } = require('../middleware/tokenHandle');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pizzas
 *   description: API para gestionar las pizzas
 */

/**
 * @swagger
 * /pizzas:
 *   get:
 *     summary: Obtiene todas las pizzas
 *     tags: [Pizzas]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 pizzas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pizza'
 */
router.get('/', pizzaController.getAll)

/**
 * @swagger
 * /pizzas/{id}:
 *   get:
 *     summary: Obtiene una pizza por su ID
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pizza
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 pizzas:
 *                   $ref: '#/components/schemas/Pizza'
 *       404:
 *         description: Pizza no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/:id", pizzaController.getById);

/**
 * @swagger
 * /pizzas/{id}/detalle:
 *   get:
 *     summary: Obtiene los detalles de una pizza por su ID
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pizza
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PizzaDetalles'
 *       404:
 *         description: Pizza no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/:id/detalle", pizzaController.getDetalles)


/**
 * @swagger
 * /pizzas:
 *   post:
 *     summary: Crea una nueva pizza
 *     tags: [Pizzas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPizza'
 *     responses:
 *       201:
 *         description: Pizza creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 newPizza:
 *                   $ref: '#/components/schemas/Pizza'
 *       400:
 *         description: Error de solicitud inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/', (request, response, next) => {
    const authHeader = request.headers.authorization;
    if( authHeader && authHeader.startsWith('Bearer ')) {
        checkType(request, response, next);
    } else {
        authenticateToken(request, response, next);
    }
}, pizzaController.createPizza);
/**
 * @swagger
 * /pizzas/{pizzaId}/ingredientes/{ingredienteId}:
 *   post:
 *     summary: Agrega un ingrediente a una pizza
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: pizzaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pizza
 *       - in: path
 *         name: ingredienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ingrediente
 *     responses:
 *       200:
 *         description: Ingrediente agregado exitosamente a la pizza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 ingredientesPizza:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ingrediente'
 *       404:
 *         description: Pizza o ingrediente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/:pizzaId/ingredientes/:ingredienteId", pizzaController.addIngredientes);


/**
 * @swagger
 * /pizzas/{pizzaId}/remove-ingrediente/{ingredienteId}:
 *   post:
 *     summary: Elimina un ingrediente de una pizza
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: pizzaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pizza
 *       - in: path
 *         name: ingredienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ingrediente
 *     responses:
 *       200:
 *         description: Ingrediente eliminado exitosamente de la pizza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *       404:
 *         description: Pizza o ingrediente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/:pizzaId/remove-ingrediente/:ingredienteId", pizzaController.removeIngredientes)

/**
 * @swagger
 * /pizzas/{id}:
 *   patch:
 *     summary: Actualiza una pizza por su ID
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePizza'
 *     responses:
 *       200:
 *         description: Pizza actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 pizzaUpdated:
 *                   $ref: '#/components/schemas/Pizza'
 *       404:
 *         description: Pizza no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 */
router.patch('/:id', (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        checkType(request, response, next);
    } else {
        authenticateToken(request, response, next);
    }
}, pizzaController.updatePizza);

module.exports = router;