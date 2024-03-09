const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Usuarios = require("../mysql/usuarios")
const Clientes = require("../mysql/clientes")
const Productos = require("../mysql/productos")

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
        TipoVenta: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
    }, {
        timestamps: false,
    }
);

//FK RELACION TABLA VENTAS CON TABLA USUARIOS
Ventas.belongsTo(Usuarios, {
    foreignKey: 'Usuario_ID',
    targetKey: 'id',
    as: 'Usuario',
});

//FK RELACION TABLA VENTAS CON TABLA CLIENTES
Ventas.belongsTo(Clientes, {
    foreignKey: 'Cliente_ID',
    targetKey: 'id',
    as: 'Cliente',
});


//FK RELACION TABLA DETALLEVENTAS CON TABLA PRODUCTOS
DetalleVentas.belongsTo(Productos, {
    foreignKey: 'Producto_ID',
    targetKey: 'id',
    as: 'Producto',
});


module.exports = { Ventas, DetalleVentas };