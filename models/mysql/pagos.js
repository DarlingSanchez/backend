const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const MetodosPago = sequelize.define(
    "metodospago", {
        NombreMetodo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    }
);

const DetallePagos = sequelize.define(
    "detalle_pagos", {
        Venta_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        MetodoPago_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        MontoPago: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        timestamps: false,
    }
);

const DatosPago = sequelize.define(
    "datos_pago", {
        Venta_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Campo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Dato: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    }
);

module.exports = { MetodosPago, DetallePagos, DatosPago };