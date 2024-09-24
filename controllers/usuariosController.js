let usuarios = [
    { id: 1, nombre: "Carlos", email: "carlos@example.com" },
    { id: 2, nombre: "María", email: "maria@example.com" },
    { id: 3, nombre: "Juan", email: "juan@example.com" },
  ];
  
  // Obtener todos los usuarios
  const obtenerUsuarios = (req, res) => {
    res.status(200).json(usuarios);
  };
  
  // Obtener un usuario por ID
  const obtenerUsuarioPorId = (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  };
  
  // Crear un nuevo usuario
  const crearUsuario = (req, res) => {
    const { nombre, email } = req.body;
    const nuevoUsuario = { id: usuarios.length + 1, nombre, email };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
  };
  
  // Actualizar un usuario por ID
  const actualizarUsuario = (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
    const { nombre, email } = req.body;
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    res.status(200).json(usuario);
  };
  
  // Eliminar un usuario por ID
  const eliminarUsuario = (req, res) => {
    usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
  };
  
  module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
  };
  