const express = require('express');
const app = express();

// Cargar las variables de entorno
require('dotenv').config();

// Usar el puerto desde variables de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Nueva ruta adicional
app.get('/saludo', (req, res) => {
  const nombre = req.query.nombre || 'amigo'; // Toma un parámetro de consulta
  res.send(`¡Hola, ${nombre}!`);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
