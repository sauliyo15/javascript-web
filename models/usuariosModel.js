//const pool = require("./db");
const Usuario = require("./usuario");

// Función para obtener todos los usuarios SIN ORM
/*const obtenerUsuarios = async () => {
  const conexion = await pool.getConnection();
  try {
    const [resultado] = await conexion.query("SELECT * FROM usuarios");
    return resultado;
  } catch (error) {
    throw error;
  } finally {
    conexion.release();
  }
};*/

// Función para obtener todos los usuarios CON ORM
const obtenerUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
};

// Función para obtener un usuario por ID SIN ORM
/*const obtenerUsuarioPorId = async (id) => {
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
};*/

// Función para obtener un usuario por ID CON ORM
const obtenerUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    return usuario;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo usuario SIN ORM
/*const crearUsuario = async (usuario) => {
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
};*/

// Función para crear un nuevo usuario CON ORM
const crearUsuario = async (usuario) => {
  try {
    const nuevoUsuario = await Usuario.create(usuario);
    return nuevoUsuario;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un usuario existente SIN ORM
/*const actualizarUsuario = async (id, usuario) => {
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
};*/

// Función para actualizar un usuario existente CON ORM
const actualizarUsuario = async (id, usuario) => {
  try {
    const [filasActualizadas] = await Usuario.update(usuario, {
      where: { id }
    });
    return filasActualizadas;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un usuario SIN ORM
/*const eliminarUsuario = async (id) => {
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
};*/

// Función para eliminar un usuario CON ORM
const eliminarUsuario = async (id) => {
  try {
    const filasEliminadas = await Usuario.destroy({
      where: { id }
    });
    
    return filasEliminadas; // Retorna el número de filas eliminadas
  } catch (error) {
    throw error; // Lanza el error para que el controlador lo capture
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
