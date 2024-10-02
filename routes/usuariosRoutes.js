const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Definimos las rutas para el CRUD
router.get("/", usuariosController.obtenerUsuarios);
router.get("/:id", usuariosController.obtenerUsuarioPorId);
router.post("/", usuariosController.crearUsuario);
router.put("/:id", usuariosController.actualizarUsuario);
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;
