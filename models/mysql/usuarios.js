const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Usuarios = sequelize.define(
    "usuarios", {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
        },
        Rol_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    }
);

module.exports = Usuarios;