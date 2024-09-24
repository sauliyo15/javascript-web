const app = require('./app');
const port = process.env.PORT || 4000;

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

