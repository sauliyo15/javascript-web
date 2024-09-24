const express = require("express");
const router = express.Router();
const {
  obtenerRoot,
  obtenerApi,
  obtenerSaludo,
} = require("../controllers/apiController");

// Definimos las rutas de ejemplo
router.get("/", obtenerRoot);
router.get("/api", obtenerApi);
router.get("/saludo", obtenerSaludo);

module.exports = router;
