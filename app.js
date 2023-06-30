const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { dbConnect } = require('./database/db');

app.use(morgan("dev"));
app.use(express.json());
app.use(cors('*'))
app.use('/api');


app.listen(3000, () => {
    Sequelize.afterSync({force: false}).then(() => {
        console.log(`Server running on port https://localhost:3000`);
    });
    // conectar la base de datos
    dbConnect();
})