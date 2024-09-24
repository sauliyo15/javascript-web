const express = require("express");
const app = express();

// Cargar las variables de entorno
require("dotenv").config();

// Usar el puerto desde variables de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

// Permitir el uso de JSON en el body de las peticiones
app.use(express.json());

// Definimos un array de usuarios
let users = [
  { id: 1, nombre: "Carlos", email: "carlos@example.com" },
  { id: 2, nombre: "María", email: "maria@example.com" },
  { id: 3, nombre: "Juan", email: "juan@example.com" },
];

// --- Rutas anteriores ---

// Ruta raíz "/"
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

// Ruta "/api"
app.get("/api", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Nueva ruta "/saludo" usando variables de entorno
app.get("/saludo", (req, res) => {
  const nombre = process.env.ADMINISTRADOR || "amigo";
  res.status(200).json(`¡Hola, ${nombre}!`);
});

// --- CRUD de usuarios ---

// Obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  res.status(200).json(users);
});

// Obtener un usuario por ID
app.get("/usuarios/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Crear un nuevo usuario
app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;
  const newUser = {
    id: users.length + 1, // ID autogenerado para este ejemplo
    nombre,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Actualizar un usuario por ID
app.put("/usuarios/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    const { nombre, email } = req.body;
    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Eliminar un usuario por ID
app.delete("/usuarios/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json(deletedUser[0]);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Iniciar el servidor solo si no se ha requerido el archivo en otro módulo (como en los tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

module.exports = app;
