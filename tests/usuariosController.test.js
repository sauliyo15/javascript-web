const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuariosController");

let usuarios = [];

// Simulamos los objetos req y res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  res.send = jest.fn();
  return res;
};

beforeEach(() => {
  usuarios = [
    { id: 1, nombre: "Carlos", email: "carlos@example.com" },
    { id: 2, nombre: "María", email: "maria@example.com" },
    { id: 3, nombre: "Juan", email: "juan@example.com" },
  ];
});

// Test para obtener todos los usuarios
test("obtenerUsuarios debería devolver todos los usuarios", () => {
  const req = {};
  const res = mockResponse();

  obtenerUsuarios(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(usuarios);
});

// Test para obtener un usuario por ID
test("obtenerUsuarioPorId debería devolver un usuario específico", () => {
  const req = { params: { id: 1 } };
  const res = mockResponse();

  obtenerUsuarioPorId(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(usuarios[0]);
});

// Test para crear un usuario
test("crearUsuario debería crear un nuevo usuario", () => {
  const req = { body: { nombre: "Nuevo Usuario", email: "nuevo@example.com" } };
  const res = mockResponse();

  crearUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(Number),
      nombre: "Nuevo Usuario",
      email: "nuevo@example.com",
    })
  );
});

// Test para actualizar un usuario
test("actualizarUsuario debería actualizar un usuario existente", () => {
  const req = { params: { id: 1 }, body: { nombre: "Usuario Actualizado", email: "carlitos@example.com" } };
  const res = mockResponse();

  actualizarUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      nombre: "Usuario Actualizado",
      email: "carlitos@example.com", // Verifica que no se haya cambiado el email
    })
  );
});

// Test para eliminar un usuario
test("eliminarUsuario debería eliminar un usuario existente", () => {
  const req = { params: { id: 1 } };
  const res = mockResponse();

  eliminarUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
});
