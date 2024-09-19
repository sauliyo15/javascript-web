const express = require('express');
const app = express();

// Cargar las variables de entorno
require('dotenv').config();

// Usar el puerto desde variables de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
