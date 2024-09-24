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

describe('CRUD operations for /usuarios', () => {

  // Usuarios de prueba iniciales
  let users = [
    { id: 1, nombre: "Carlos", email: "carlos@example.com" },
    { id: 2, nombre: "María", email: "maria@example.com" },
    { id: 3, nombre: "Juan", email: "juan@example.com" },
  ];

  // Test para obtener todos los usuarios
  test('GET /usuarios should return all users', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users);
  });

  // Test para obtener un usuario por ID (existente)
  test('GET /usuarios/:id should return a user by ID', async () => {
    const res = await request(app).get('/usuarios/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users[0]);
  });

  // Test para obtener un usuario por ID (no existente)
  test('GET /usuarios/:id should return 404 if user not found', async () => {
    const res = await request(app).get('/usuarios/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
  });

  // Test para crear un nuevo usuario
  test('POST /usuarios should create a new user', async () => {
    const newUser = { nombre: 'Pedro', email: 'pedro@example.com' };
    const res = await request(app).post('/usuarios').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('nombre', 'Pedro');
    expect(res.body).toHaveProperty('email', 'pedro@example.com');
    expect(res.body).toHaveProperty('id'); // Debe generarse un ID
  });

  // Test para actualizar un usuario existente
  test('PUT /usuarios/:id should update a user', async () => {
    const updatedUser = { nombre: 'Carlos Updated', email: 'carlosupdated@example.com' };
    const res = await request(app).put('/usuarios/1').send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre', 'Carlos Updated');
    expect(res.body).toHaveProperty('email', 'carlosupdated@example.com');
  });

  // Test para actualizar un usuario no existente
  test('PUT /usuarios/:id should return 404 if user not found', async () => {
    const updatedUser = { nombre: 'Fake User', email: 'fake@example.com' };
    const res = await request(app).put('/usuarios/999').send(updatedUser);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
  });

  // Test para eliminar un usuario existente
  test('DELETE /usuarios/:id should delete a user', async () => {
    const res = await request(app).delete('/usuarios/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre', 'Carlos Updated');
  });

  // Test para eliminar un usuario no existente
  test('DELETE /usuarios/:id should return 404 if user not found', async () => {
    const res = await request(app).delete('/usuarios/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
  });

});


  