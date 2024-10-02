const usuariosModel = require('../../models/usuariosModel');
const pool = require('../../models/db');

// Mockeamos la conexión de la base de datos
jest.mock('../../models/db', () => ({
  getConnection: jest.fn().mockResolvedValue({
    query: jest.fn(),
    release: jest.fn(),
  }),
}));

describe('Usuarios Model', () => {
  let mockConnection;

  beforeEach(() => {
    // Reinicializamos la mock connection antes de cada test
    mockConnection = {
      query: jest.fn(),
      release: jest.fn(),
    };
    pool.getConnection.mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('obtenerUsuarios', () => {
    it('debería obtener todos los usuarios', async () => {
      const mockUsuarios = [{ id: 1, nombre: 'Juan', email: 'juan@example.com' }];
      mockConnection.query.mockResolvedValue([mockUsuarios]);

      const usuarios = await usuariosModel.obtenerUsuarios();
      expect(pool.getConnection).toHaveBeenCalled();
      expect(mockConnection.query).toHaveBeenCalledWith('SELECT * FROM usuarios');
      expect(usuarios).toEqual(mockUsuarios);
      expect(mockConnection.release).toHaveBeenCalled();
    });

    it('debería lanzar un error si la consulta falla', async () => {
      const mockError = new Error('Error de base de datos');
      mockConnection.query.mockRejectedValue(mockError);

      await expect(usuariosModel.obtenerUsuarios()).rejects.toThrow(mockError);
      expect(mockConnection.release).toHaveBeenCalled();
    });
  });

  describe('obtenerUsuarioPorId', () => {
    it('debería obtener un usuario por ID', async () => {
      const mockUsuario = { id: 1, nombre: 'Juan', email: 'juan@example.com' };
      mockConnection.query.mockResolvedValue([[mockUsuario]]);

      const usuario = await usuariosModel.obtenerUsuarioPorId(1);
      expect(pool.getConnection).toHaveBeenCalled();
      expect(mockConnection.query).toHaveBeenCalledWith('SELECT * FROM usuarios WHERE id = ?', [1]);
      expect(usuario).toEqual(mockUsuario);
      expect(mockConnection.release).toHaveBeenCalled();
    });

    it('debería lanzar un error si la consulta falla', async () => {
      const mockError = new Error('Error de base de datos');
      mockConnection.query.mockRejectedValue(mockError);

      await expect(usuariosModel.obtenerUsuarioPorId(1)).rejects.toThrow(mockError);
      expect(mockConnection.release).toHaveBeenCalled();
    });
  });

  describe('crearUsuario', () => {
    it('debería crear un nuevo usuario', async () => {
      const mockUsuario = { nombre: 'Juan', email: 'juan@example.com' };
      const mockInsertResult = { insertId: 1 };
      mockConnection.query.mockResolvedValue([mockInsertResult]);

      const usuarioCreado = await usuariosModel.crearUsuario(mockUsuario);
      expect(pool.getConnection).toHaveBeenCalled();
      expect(mockConnection.query).toHaveBeenCalledWith('INSERT INTO usuarios SET ?', mockUsuario);
      expect(usuarioCreado).toEqual({ id: 1, ...mockUsuario });
      expect(mockConnection.release).toHaveBeenCalled();
    });

    it('debería lanzar un error si la inserción falla', async () => {
      const mockError = new Error('Error de base de datos');
      mockConnection.query.mockRejectedValue(mockError);

      await expect(usuariosModel.crearUsuario({ nombre: 'Juan', email: 'juan@example.com' })).rejects.toThrow(mockError);
      expect(mockConnection.release).toHaveBeenCalled();
    });
  });

  describe('actualizarUsuario', () => {
    it('debería actualizar un usuario existente', async () => {
      const mockUpdateResult = { affectedRows: 1 };
      mockConnection.query.mockResolvedValue([mockUpdateResult]);

      const resultado = await usuariosModel.actualizarUsuario(1, { nombre: 'Juan', email: 'juan@example.com' });
      expect(pool.getConnection).toHaveBeenCalled();
      expect(mockConnection.query).toHaveBeenCalledWith('UPDATE usuarios SET ? WHERE id = ?', [{ nombre: 'Juan', email: 'juan@example.com' }, 1]);
      expect(resultado).toEqual(mockUpdateResult);
      expect(mockConnection.release).toHaveBeenCalled();
    });

    it('debería lanzar un error si la actualización falla', async () => {
      const mockError = new Error('Error de base de datos');
      mockConnection.query.mockRejectedValue(mockError);

      await expect(usuariosModel.actualizarUsuario(1, { nombre: 'Juan', email: 'juan@example.com' })).rejects.toThrow(mockError);
      expect(mockConnection.release).toHaveBeenCalled();
    });
  });

  describe('eliminarUsuario', () => {
    it('debería eliminar un usuario por ID', async () => {
      const mockDeleteResult = { affectedRows: 1 };
      mockConnection.query.mockResolvedValue([mockDeleteResult]);

      const resultado = await usuariosModel.eliminarUsuario(1);
      expect(pool.getConnection).toHaveBeenCalled();
      expect(mockConnection.query).toHaveBeenCalledWith('DELETE FROM usuarios WHERE id = ?', [1]);
      expect(resultado).toEqual(mockDeleteResult);
      expect(mockConnection.release).toHaveBeenCalled();
    });

    it('debería lanzar un error si la eliminación falla', async () => {
      const mockError = new Error('Error de base de datos');
      mockConnection.query.mockRejectedValue(mockError);

      await expect(usuariosModel.eliminarUsuario(1)).rejects.toThrow(mockError);
      expect(mockConnection.release).toHaveBeenCalled();
    });
  });
});
