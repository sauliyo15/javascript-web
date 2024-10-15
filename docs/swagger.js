const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración de Swagger
const setupSwagger = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', // Especificación OpenAPI
      info: {
        title: 'API CRUD de Usuarios',
        version: '1.0.0',
        description: 'Documentación de la API para gestionar usuarios.',
      },
      servers: [
        {
          url: 'http://localhost:4000', // URL de tu servidor
        },
      ],
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos de rutas donde se encuentran las anotaciones
  };

  // Generar la documentación Swagger
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  // Middleware para Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
