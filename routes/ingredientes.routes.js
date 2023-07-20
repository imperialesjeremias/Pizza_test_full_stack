const {Router} = require('express');
const ingredienteController = require('../controllers/ingredientes.controller');
const {checkType, authenticateToken} = require('../middleware/tokenHandle');
const router = Router()

/**
 * @swagger
 * tags:
 *   name: Ingredientes
 *   description: API para gestionar los ingredientes de las pizzas
 */

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Obtiene todos los ingredientes
 *     tags: [Ingredientes]
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
 *                 ingredientes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ingrediente'
 */

/**
 * @swagger
 * /ingredientes/{id}:
 *   get:
 *     summary: Obtiene un ingrediente por su ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del ingrediente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingrediente'
 *       404:
 *         description: Ingrediente no encontrado

 *   patch:
 *     summary: Actualiza un ingrediente por su ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del ingrediente
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos del ingrediente a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredienteUpdate'
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingrediente'
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Ingrediente no encontrado

 *   delete:
 *     summary: Elimina un ingrediente por su ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del ingrediente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrediente eliminado exitosamente
 *       404:
 *         description: Ingrediente no encontrado

 * /ingredientes:
 *   post:
 *     summary: Crea un nuevo ingrediente
 *     tags: [Ingredientes]
 *     requestBody:
 *       description: Datos del nuevo ingrediente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredienteCreate'
 *     responses:
 *       201:
 *         description: Ingrediente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingrediente'
 *       400:
 *         description: Error en la solicitud

 */

router.get('/', ingredienteController.getAll);
router.get('/:id', ingredienteController.getById);
router.post('/', (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')) {
        checkType(request, response, next);
    } else {
        authenticateToken(request, response, next);
    }
}, ingredienteController.createIngrediente);
router.patch('/:id', (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')) {
        checkType(request, response, next);
    } else {
        authenticateToken(request, response, next);
    }
}, ingredienteController.updateIngrediente);

router.delete('/:id', (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')) {
        checkType(request, response, next);
    } else {
        authenticateToken(request, response, next);
    }
}, ingredienteController.deleteIngrediente);

module.exports = router;