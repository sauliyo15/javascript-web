const request = require("supertest");
const app = require("../app"); // Asegúrate de que la ruta sea correcta

describe("Test de rutas de la API", () => {
  // Test para la ruta raíz "/"
  test("GET / debería devolver Hello, world!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hola Mundo");
  });

  // Test para la ruta "/api"
  test("GET /api debería devolver un mensaje JSON", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "API funcionando OK");
  });

  // Test para la ruta "/saludo"
  test("GET /saludo debería saludar correctamente", async () => {
    process.env.ADMINISTRADOR = "Carlos"; // Simulamos la variable de entorno
    const res = await request(app).get("/saludo");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe('¡Hola, Carlos!');

    delete process.env.ADMINISTRADOR; // Limpiamos la variable de entorno
  });

  // Pruebas CRUD
  describe("CRUD de usuarios", () => {
    const user = { nombre: "Nuevo Usuario", email: "nuevo@example.com" };

    // Test para obtener todos los usuarios
    test("GET /usuarios debería devolver todos los usuarios", async () => {
      const res = await request(app).get("/usuarios");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    // Test para obtener un usuario por ID
    test("GET /usuarios/:id debería devolver un usuario específico", async () => {
      const res = await request(app).get("/usuarios/1"); // Cambia el ID según tu configuración
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("nombre");
      expect(res.body).toHaveProperty("email");
    });

    // Test para crear un nuevo usuario
    test("POST /usuarios debería crear un nuevo usuario", async () => {
      const res = await request(app).post("/usuarios").send(user);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("nombre", user.nombre);
      expect(res.body).toHaveProperty("email", user.email);
    });

    // Test para actualizar un usuario
    test("PUT /usuarios/:id debería actualizar un usuario existente", async () => {
      const res = await request(app)
        .put("/usuarios/1")
        .send({ nombre: "Usuario Actualizado" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("nombre", "Usuario Actualizado");
    });

    // Test para eliminar un usuario
    test("DELETE /usuarios/:id debería eliminar un usuario existente", async () => {
      const res = await request(app).delete("/usuarios/1"); // Cambia el ID según tu configuración
      expect(res.statusCode).toEqual(204);
    });
  });
});
