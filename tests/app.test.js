// tests/app.test.js
const request = require('supertest');
const app = require('../index');  // Importamos la app de Express

describe('Test API routes', () => {
  // Test para la ruta raíz "/"
  test('GET / should return Hello, world!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello, world!');
  });

  // Test para la ruta "/api"
  test('GET /api should return a JSON message', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'API is running');
  });

  // Test para la ruta "/saludo" cuando ADMINISTRADOR está definido
  test('GET /saludo should return greeting with ADMINISTRADOR', async () => {
    process.env.ADMINISTRADOR = 'Carlos';  // Simular la variable de entorno
    const res = await request(app).get('/saludo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('¡Hola, Carlos!');
  });

  // Test para la ruta "/saludo" cuando ADMINISTRADOR no está definido
  test('GET /saludo should return default greeting when ADMINISTRADOR is not set', async () => {
    delete process.env.ADMINISTRADOR;  // Asegurarnos de que no esté definida
    const res = await request(app).get('/saludo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('¡Hola, amigo!');
  });
});


  