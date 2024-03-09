const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const HistorialPrecios = sequelize.define(
    "historial_precios", {
        Producto_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PrecioCompra: {
            type: DataTypes.DECIMAL,
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
    }, {
        timestamps: true,
    }
);



module.exports = HistorialPrecios;