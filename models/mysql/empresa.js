const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Datos_Empresa = sequelize.define(
    "datos_empresa", {
        Nombre_Legal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nombre_Comercial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RTN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Logo: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        tableName: 'datos_empresa',
        timestamps: false,
    }
);


module.exports = Datos_Empresa;