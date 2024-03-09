const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Datos_Factura = sequelize.define(
    "datos_factura", {
        CAI: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Punto_Emision: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Establecimiento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Tipo_Documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Cantidad_Aprobada: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Desde: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Hasta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Fecha_Limite: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        tableName: 'datos_factura',
        timestamps: false,
    }
);

const Factura_Impresa = sequelize.define(
    "facturas_impresas", {
        Venta_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Factura: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

    }, {
        timestamps: false,
    }
);


module.exports = { Datos_Factura, Factura_Impresa };