const request = require("supertest");
const app = require("../../app");
const usuariosModel = require("../../models/usuariosModel");

jest.mock("../../models/usuariosModel");

describe("Usuarios Controller", () => {
  beforeAll(() => {
    // Interceptar console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    // Restaurar console.error después de todos los tests
    console.error.mockRestore();
  });

  describe("GET /usuarios", () => {
    it("debería devolver todos los usuarios", async () => {
      const usuariosMock = [
        { id: 1, nombre: "Saul", email: "saul@example.com" },
        { id: 2, nombre: "Pepe", email: "pepe@example.com" },
      ];
      usuariosModel.obtenerUsuarios.mockResolvedValue(usuariosMock);

      const res = await request(app).get("/usuarios");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(usuariosMock);
    });

    it("debería devolver 404 si no se encuentran usuarios", async () => {
      usuariosModel.obtenerUsuarios.mockResolvedValue([]);

      const res = await request(app).get("/usuarios");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ mensaje: "No se encontraron usuarios" });
    });

    it("debería devolver 500 en caso de error de base de datos", async () => {
      usuariosModel.obtenerUsuarios.mockRejectedValue(
        new Error("Error de base de datos")
      );

      const res = await request(app).get("/usuarios");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ error: "Error al obtener usuarios" });
    });
  });

  describe("GET /usuarios/:id", () => {
    it("debería devolver un usuario por ID", async () => {
      const usuarioMock = { id: 1, nombre: "Saul", email: "saul@example.com" };
      usuariosModel.obtenerUsuarioPorId.mockResolvedValue(usuarioMock);

      const res = await request(app).get("/usuarios/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(usuarioMock);
    });

    it("debería devolver 404 si el usuario no se encuentra", async () => {
      usuariosModel.obtenerUsuarioPorId.mockResolvedValue(null);

      const res = await request(app).get("/usuarios/1");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ error: "Usuario con ID 1 no encontrado" });
    });

    it("debería devolver 500 en caso de error de base de datos", async () => {
      usuariosModel.obtenerUsuarioPorId.mockRejectedValue(
        new Error("Error de base de datos")
      );

      const res = await request(app).get("/usuarios/1");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        mensaje: "Error al obtener usuario con ID 1",
      });
    });
  });

  describe("POST /usuarios", () => {
    it("debería crear un nuevo usuario", async () => {
      const nuevoUsuario = { nombre: "Saul", email: "saul@example.com" };
      const usuarioCreadoMock = { id: 1, ...nuevoUsuario };
      usuariosModel.crearUsuario.mockResolvedValue(usuarioCreadoMock);

      const res = await request(app).post("/usuarios").send(nuevoUsuario);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(usuarioCreadoMock);
    });

    it("debería devolver 400 si faltan campos obligatorios", async () => {
      const nuevoUsuario = { nombre: "" }; // Falta el email

      const res = await request(app).post("/usuarios").send(nuevoUsuario);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ mensaje: "Nombre y email son obligatorios" });
    });

    it("debería devolver 500 en caso de error de base de datos", async () => {
      const nuevoUsuario = { nombre: "Saul", email: "saul@example.com" };
      usuariosModel.crearUsuario.mockRejectedValue(
        new Error("Error de base de datos")
      );

      const res = await request(app).post("/usuarios").send(nuevoUsuario);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ error: "Error al crear usuario" });
    });
  });

  describe("PUT /usuarios/:id", () => {
    it("debería actualizar un usuario", async () => {
      const usuarioActualizado = {
        nombre: "Saul Actualizado",
        email: "saul_actualizado@example.com",
      };
      usuariosModel.actualizarUsuario.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app)
        .put("/usuarios/1")
        .send(usuarioActualizado);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ id: "1", ...usuarioActualizado });
    });

    it("debería devolver 404 si el usuario no se encuentra", async () => {
      const usuarioActualizado = {
        nombre: "Saul Actualizado",
        email: "saul_actualizado@example.com",
      };
      usuariosModel.actualizarUsuario.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app)
        .put("/usuarios/1")
        .send(usuarioActualizado);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ error: "Usuario no encontrado" });
    });

    it("debería devolver 400 si faltan campos obligatorios", async () => {
      const usuarioActualizado = { nombre: "" }; // Falta el email

      const res = await request(app)
        .put("/usuarios/1")
        .send(usuarioActualizado);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ mensaje: "Nombre y email son obligatorios" });
    });

    it("debería devolver 500 en caso de error de base de datos", async () => {
      const usuarioActualizado = {
        nombre: "Saul Actualizado",
        email: "saul_actualizado@example.com",
      };
      usuariosModel.actualizarUsuario.mockRejectedValue(
        new Error("Error de base de datos")
      );

      const res = await request(app)
        .put("/usuarios/1")
        .send(usuarioActualizado);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        error: "Error al actualizar usuario con ID 1",
      });
    });
  });

  describe("DELETE /usuarios/:id", () => {
    it("debería eliminar un usuario", async () => {
      usuariosModel.eliminarUsuario.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete("/usuarios/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "Usuario eliminado con éxito" });
    });

    it("debería devolver 404 si el usuario no se encuentra", async () => {
      usuariosModel.eliminarUsuario.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app).delete("/usuarios/1");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ error: "Usuario no encontrado" });
    });

    it("debería devolver 500 en caso de error de base de datos", async () => {
      usuariosModel.eliminarUsuario.mockRejectedValue(
        new Error("Error de base de datos")
      );

      const res = await request(app).delete("/usuarios/1");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ error: "Error al eliminar usuario con ID 1" });
    });
  });
});
