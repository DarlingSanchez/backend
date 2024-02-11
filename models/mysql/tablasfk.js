const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Productos = require("../mysql/productos");

//MODELO PARA LA TABLA CATEGORIAS
const Categorias = sequelize.define(
    "categorias", {
        NombreCategoria: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    }
);

//FK RELACION TABLA PRODUCTOS CON TABLA CATEGORIAS
Productos.belongsTo(Categorias, {
    foreignKey: 'Categoria_ID',
    targetKey: 'id',
    as: 'Categoria',
});

//MODELO PARA LA TABLA IMPUESTOS
const Impuestos = sequelize.define(
    "Impuestos", {
        NombreImpuesto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Porcentaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
    }
);

//FK RELACION TABLA PRODUCTOS CON TABLA IMPUESTOS
Productos.belongsTo(Impuestos, {
    foreignKey: 'Impuesto_ID',
    targetKey: 'id',
    as: 'Impuesto',
});

//MODELO PARA LA TABLA UNIDADES_MEDIDAS
const Unidades_Medidas = sequelize.define(
    "unidades_medidas", {
        Unidad_Medida: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    }
);

//FK RELACION TABLA PRODUCTOS CON TABLA IMPUESTOS
Productos.belongsTo(Unidades_Medidas, {
    foreignKey: 'UM_ID',
    targetKey: 'id',
    as: 'Unidad_Medida',
});

module.exports = { Categorias, Impuestos, Unidades_Medidas }