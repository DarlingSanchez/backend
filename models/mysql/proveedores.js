const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Proveedores = sequelize.define(
    "proveedores", {
        NombreDelProveedor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RTN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NombreDelRepresentante: {
            type: DataTypes.STRING,
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

module.exports = Proveedores;