const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Compras = sequelize.define(
    "compras", {
        Usuario_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Proveedor_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        N_FacturaProveedor: {
            type: DataTypes.STRING,
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

const DetalleCompras = sequelize.define(
    "detalle_compras", {
        Compra_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Producto_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CantidadComprada: {
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

module.exports = { Compras, DetalleCompras };