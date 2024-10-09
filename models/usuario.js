const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Usuario extends Model {}

// Define el modelo
Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize, // la instancia de Sequelize
    modelName: 'Usuario', // nombre del modelo
    tableName: 'usuarios', // nombre de la tabla
    timestamps: false, // si no deseas los campos createdAt y updatedAt
});

module.exports = Usuario;
