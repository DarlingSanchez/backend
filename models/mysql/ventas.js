const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Ventas = sequelize.define(
    "ventas", {
        Usuario_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        N_Factura: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Cliente_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SubTotal: {
            type: DataTypes.DECIMAL,
        },
        Descuento: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Impuesto: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Total: {
            type: DataTypes.DECIMAL,
        },
    }, {
        timestamps: true,
    }
);

const DetalleVentas = sequelize.define(
    "detalle_ventas", {
        Venta_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Producto_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CantidadVendida: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Precio: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        SubTotal: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Descuento: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Impuesto: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        timestamps: false,
    }
);

module.exports = { Ventas, DetalleVentas };