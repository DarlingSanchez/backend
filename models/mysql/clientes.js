const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Clientes = sequelize.define(
    "clientes", {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DNI_RTN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CorreoElectronico: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Direccion: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
    }
);

module.exports = Clientes;