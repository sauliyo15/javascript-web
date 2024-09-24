const {
  obtenerRoot,
  obtenerApi,
  obtenerSaludo
} = require('../controllers/apiController');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  res.send = jest.fn();
  return res;
};

// Test para la ruta raíz "/"
test('obtenerRaiz debería devolver un saludo', () => {
  const req = {};
  const res = mockResponse();

  obtenerRoot(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith('Hola Mundo');
});

// Test para la ruta "/api"
test('obtenerApi debería devolver un mensaje JSON', () => {
  const req = {};
  const res = mockResponse();

  obtenerApi(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'API funcionando OK' });
});

// Test para la ruta "/saludo"
test('obtenerSaludo debería devolver un saludo basado en el nombre', () => {
  const req = {};
  const res = mockResponse();
  
  process.env.ADMINISTRADOR = 'Carlos'; // Simulamos la variable de entorno

  obtenerSaludo(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith('¡Hola, Carlos!');

  delete process.env.ADMINISTRADOR; // Limpiamos la variable de entorno
});

