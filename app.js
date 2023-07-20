const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { dbConnect, sequelize } = require('./database/db');
const app = express()
const apiRouter = express.Router();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors('*'))

// swaggerr
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// routes
const pizzasRoutes = require('./routes/pizza.routes');
const ingredientesRoutes = require('./routes/ingredientes.routes');
const usuariosRoutes = require('./routes/usuario.routes');

// modelos
const {ingredientes} = require('./models/ingredientes')
const {pizza} = require('./models/pizza');
const {usuario} = require('./models/usuario')


// endponts
app.use('/api', apiRouter);
apiRouter.use('/pizzas',pizzasRoutes);
apiRouter.use('/ingredientes',ingredientesRoutes);
apiRouter.use('/auth',usuariosRoutes);


// configuracion del swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentation',
            version: '1.0.0',
            description: 'Test Fullstack'
        },
    },
    apis: ['./routes/pizza.routes.js', './routes/ingredientes.routes.js', './routes/usuario.routes.js'],  
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    // fix por nueva version de sequelize
    sequelize.sync({force: true}).then(() => {
        console.log(`Server running on port https://localhost:3000`);
    });
    // conectar la base de datos
    dbConnect();
})