const express = require('express');
const app = express();

// Cargar las variables de entorno
require('dotenv').config();

// Usar el puerto desde variables de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

// Otra ruta
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Nueva ruta adicional
app.get('/saludo', (req, res) => {
  const nombre = process.env.ADMINISTRADOR || 'amigo';
  res.status(200).json(`¡Hola, ${nombre}!`);
});


// Iniciar el servidor solo si no se ha requerido el archivo en otro módulo (como en los tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

module.exports = app;