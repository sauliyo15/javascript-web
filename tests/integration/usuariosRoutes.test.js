const request = require('supertest');
const app = require('../../app');
const pool = require('../../models/db');

// Limpiar la base de datos después de cada prueba
afterEach(async () => {
  await pool.query('DELETE FROM usuarios');
});

afterAll(async () => {
  await pool.end();
});

describe('Pruebas de integración para usuariosRoutes', () => {

  // Prueba de obtener todos los usuarios (cuando no hay usuarios)
  it('GET /usuarios - debería obtener una lista de usuarios vacía', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(404); // No hay usuarios
    expect(res.body.mensaje).toEqual("No se encontraron usuarios");
  });

  // Prueba de obtener todos los usuarios (cuando hay usuarios)
  it('GET /usuarios - debería devolver todos los usuarios', async () => {
    const usuarios = [
      { nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
      { nombre: 'Ana López', email: 'ana.lopez@example.com' }
    ];

    // Crear dos usuarios
    await request(app).post('/usuarios').send(usuarios[0]);
    await request(app).post('/usuarios').send(usuarios[1]);

    // Obtener todos los usuarios
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(200); // Éxito
    expect(res.body).toHaveLength(2); // Debe haber dos usuarios
    expect(res.body[0].nombre).toEqual(usuarios[0].nombre);
    expect(res.body[1].nombre).toEqual(usuarios[1].nombre);
  });

  // Prueba de crear un usuario
  it('POST /usuarios - debería crear un nuevo usuario', async () => {
    const nuevoUsuario = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com'
    };

    const res = await request(app)
      .post('/usuarios')
      .send(nuevoUsuario);

    expect(res.statusCode).toEqual(201); // Creación exitosa
    expect(res.body.nombre).toEqual(nuevoUsuario.nombre);
    expect(res.body.email).toEqual(nuevoUsuario.email);
  });

  // Prueba de obtener un usuario por ID
  it('GET /usuarios/:id - debería obtener un usuario por su ID', async () => {
    const nuevoUsuario = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com'
    };

    // Crear un usuario primero
    const usuarioCreado = await request(app)
      .post('/usuarios')
      .send(nuevoUsuario);

    const res = await request(app).get(`/usuarios/${usuarioCreado.body.id}`);
    expect(res.statusCode).toEqual(200); // Usuario encontrado
    expect(res.body.nombre).toEqual(nuevoUsuario.nombre);
    expect(res.body.email).toEqual(nuevoUsuario.email);
  });

  // Prueba de actualizar un usuario
  it('PUT /usuarios/:id - debería actualizar un usuario', async () => {
    const nuevoUsuario = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com'
    };

    // Crear un usuario primero
    const usuarioCreado = await request(app)
      .post('/usuarios')
      .send(nuevoUsuario);

    const usuarioActualizado = {
      nombre: 'Juan Actualizado',
      email: 'juan.actualizado@example.com'
    };

    const res = await request(app)
      .put(`/usuarios/${usuarioCreado.body.id}`)
      .send(usuarioActualizado);

    expect(res.statusCode).toEqual(200); // Actualización exitosa
    expect(res.body.nombre).toEqual(usuarioActualizado.nombre);
    expect(res.body.email).toEqual(usuarioActualizado.email);
  });

  // Prueba de eliminar un usuario
  it('DELETE /usuarios/:id - debería eliminar un usuario', async () => {
    const nuevoUsuario = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com'
    };

    // Crear un usuario primero
    const usuarioCreado = await request(app)
      .post('/usuarios')
      .send(nuevoUsuario);

    const res = await request(app).delete(`/usuarios/${usuarioCreado.body.id}`);
    expect(res.statusCode).toEqual(200); // Eliminación exitosa
    expect(res.body.message).toEqual('Usuario eliminado con éxito');
  });

  // Prueba de obtener un usuario que no existe
  it('GET /usuarios/:id - debería devolver un error si el usuario no existe', async () => {
    const res = await request(app).get('/usuarios/999');
    expect(res.statusCode).toEqual(404); // Usuario no encontrado
    expect(res.body.error).toEqual('Usuario con ID 999 no encontrado');
  });
});
