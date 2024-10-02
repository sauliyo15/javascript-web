const request = require('supertest');
const app = require('../../app');

describe('API Controller', () => {
  it('GET / - debería devolver "Hola Mundo"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hola Mundo');
  });

  it('GET /api - debería devolver { message: "API funcionando OK" }', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'API funcionando OK' });
  });

  it('GET /saludo - debería saludar correctamente', async () => {
    const res = await request(app).get('/saludo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: `¡Hola, ${process.env.ADMINISTRADOR || "amigo"}!` });
  });
});
