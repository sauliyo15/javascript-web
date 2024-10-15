const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Definimos las rutas de ejemplo

/**
 * @swagger
 * /:
 *   get:
 *     summary: Muestra un mensaje de saludo
 *     description: Retorna un saludo de bienvenida al acceder a la raíz del servidor.
 *     tags: [API Básica]
 *     responses:
 *       200:
 *         description: Devuelve "Hola Mundo"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hola Mundo
 */
router.get("/", apiController.obtenerRoot);

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Verifica el estado de la API
 *     description: Retorna un mensaje JSON indicando que la API está funcionando correctamente.
 *     tags: [API Básica]
 *     responses:
 *       200:
 *         description: Retorna un mensaje con el estado de la API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API funcionando OK"
 */
router.get("/api", apiController.obtenerApi);

/**
 * @swagger
 * /saludo:
 *   get:
 *     summary: Saludo personalizado
 *     description: Retorna un saludo personalizado basado en la variable de entorno ADMINISTRADOR.
 *     tags: [API Básica]
 *     responses:
 *       200:
 *         description: Devuelve un saludo personalizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "¡Hola, ADMINISTRADOR!"
 */
router.get("/saludo", apiController.obtenerSaludo);

module.exports = router;
