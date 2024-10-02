const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Definimos las rutas de ejemplo
router.get("/", apiController.obtenerRoot);
router.get("/api", apiController.obtenerApi);
router.get("/saludo", apiController.obtenerSaludo);

module.exports = router;
