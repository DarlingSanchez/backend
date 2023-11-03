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
        Ganancia: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Imagen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    }
);

module.exports = Productos;