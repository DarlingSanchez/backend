const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Productos = sequelize.define(
    "productos", {
        Codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NombreDelProducto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Categoria_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.TEXT,
        },
        Stock: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        UM_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PrecioCompra: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Impuesto_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PrecioVenta: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        PrecioVentaMayoreo: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Activo: {
            type: DataTypes.CHAR(["S", "N"]),
            allowNull: false
        },
        Archivo_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    }
);



module.exports = Productos;