const express = require('express');
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuariosRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Permitir el uso de JSON en el body de las peticiones
app.use(express.json());

// Usamos las rutas separadas
app.use('/usuarios', usuariosRoutes);
app.use('/', apiRoutes);

module.exports = app;