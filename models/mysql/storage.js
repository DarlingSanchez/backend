const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Productos = require("../mysql/productos");

const Storage = sequelize.define(
    "archivos", {
        Url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
    }
);
//FK RELACION TABLA PRODUCTOS CON TABLA STORAGE
Productos.belongsTo(Storage, {
    foreignKey: 'Archivo_ID',
    targetKey: 'id',
    as: 'Archivo',
});

module.exports = Storage;