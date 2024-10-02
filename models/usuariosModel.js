const pool = require("./db");

// Función para obtener todos los usuarios
const obtenerUsuarios = async () => {
  const conexion = await pool.getConnection();
  try {
    const [resultado] = await conexion.query("SELECT * FROM usuarios");
    return resultado;
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};

// Función para obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
  const conexion = await pool.getConnection();
  try {
    const [resultados] = await conexion.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );
    return resultados[0];
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};

// Función para crear un nuevo usuario
const crearUsuario = async (usuario) => {
  const conexion = await pool.getConnection();
  try {
    const [resultados] = await conexion.query(
      "INSERT INTO usuarios SET ?",
      usuario
    );
    return { id: resultados.insertId, ...usuario };
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};

// Función para actualizar un usuario existente
const actualizarUsuario = async (id, usuario) => {
  const conexion = await pool.getConnection();
  try {
    const [resultados] = await conexion.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [usuario, id]
    );
    return resultados;
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};

// Función para eliminar un usuario
const eliminarUsuario = async (id) => {
  const conexion = await pool.getConnection();
  try {
    const [resultados] = await conexion.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    return resultados;
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
