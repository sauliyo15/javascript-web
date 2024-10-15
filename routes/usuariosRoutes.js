const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */

// Definimos las rutas para el CRUD

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Recupera una lista de todos los usuarios almacenados en la base de datos.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del usuario
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     description: Nombre completo del usuario
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                     example: "juan.perez@example.com"
 *       404:
 *         description: No se encontraron usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje indicando que no se encontraron usuarios
 *                   example: "No se encontraron usuarios"
 *       500:
 *         description: Error al obtener la lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                   example: "Error al obtener usuarios"
 */
router.get("/", usuariosController.obtenerUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     description: Recupera un usuario específico de la base de datos utilizando su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID único del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del usuario
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   description: Nombre completo del usuario
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "juan.perez@example.com"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el usuario no fue encontrado
 *                   example: "Usuario con ID 1 no encontrado"
 *       500:
 *         description: Error al obtener el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                   example: "Error al obtener usuario con ID 1"
 */
router.get("/:id", usuariosController.obtenerUsuarioPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Agrega un nuevo usuario a la base de datos. Se requieren los campos "nombre" y "email".
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del usuario creado
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "juan.perez@example.com"
 *       400:
 *         description: Faltan campos obligatorios (nombre o email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error por campos obligatorios faltantes
 *                   example: "Nombre y email son obligatorios"
 *       500:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                   example: "Error al crear usuario"
 */
router.post("/", usuariosController.crearUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     description: Actualiza los datos de un usuario basado en su ID. Se requieren los campos "nombre" y "email".
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Carlos López"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "carlos.lopez@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario actualizado
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del usuario
 *                   example: "Carlos López"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico actualizado del usuario
 *                   example: "carlos.lopez@example.com"
 *       400:
 *         description: Faltan campos obligatorios (nombre o email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error por campos faltantes
 *                   example: "Nombre y email son obligatorios"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error si no se encuentra el usuario
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                   example: "Error al actualizar usuario"
 */
router.put("/:id", usuariosController.actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     description: Elimina un usuario de la base de datos usando su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito tras eliminar el usuario
 *                   example: "Usuario eliminado con éxito"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error si el usuario no se encuentra
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error del servidor al intentar eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                   example: "Error al eliminar usuario con ID 1"
 */
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;
