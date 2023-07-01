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

// routes
const pizzasRoutes
const ingredientesRoutes
const usuariosRoutes

// modelos
const {ingredientes} = require('./models/ingredientes')
const {pizza} = require('./models/pizza');
const {usuario} = require('./models/usuario')


// endponts
app.use('/api');
apiRouter.use('/pizzas',);
apiRouter.use('/ingredientes',);
apiRouter.use('/auth',);




app.listen(3000, () => {
    Sequelize.afterSync({force: false}).then(() => {
        console.log(`Server running on port https://localhost:3000`);
    });
    // conectar la base de datos
    dbConnect();
})