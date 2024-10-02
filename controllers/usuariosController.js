const usuariosModel = require("../models/usuariosModel");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosModel.obtenerUsuarios();
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ mensaje: "No se encuentraron usuarios" });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuariosModel.obtenerUsuarioPorId(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    res.status(500).json({ mensaje: `Error al obtener usuario con ID ${id}` });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const nuevoUsuario = req.body;

  if (!nuevoUsuario.nombre || !nuevoUsuario.email) {
    return res.status(400).json({ mensaje: "Nombre y email son obligatorios"});
  }
  try {
    const usuarioCreado = await usuariosModel.crearUsuario(nuevoUsuario);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuarioActualizado = req.body;

  if (!usuarioActualizado.nombre || !usuarioActualizado.email) {
    return res.status(400).json({ mensaje: "Nombre y email son obligatorios"});
  }
  try {
    const resultado = await usuariosModel.actualizarUsuario(
      id,
      usuarioActualizado
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado"});
    }
    return res.status(200).json({ id, ...usuarioActualizado});
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    res.status(500).json({ error: `Error al actualizar usuario con ID ${id}` });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await usuariosModel.eliminarUsuario(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado"});
    }
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    res.status(500).json({ error: `Error al eliminar usuario con ID ${id}` });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
