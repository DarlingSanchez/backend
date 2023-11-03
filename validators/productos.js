const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateObjectDataCreate = [
    check("Codigo").exists().notEmpty(),
    check("NombreDelProducto").exists().notEmpty(),
    check("Categoria_ID").exists().notEmpty().isInt(),
    check("Descripcion").exists().notEmpty(),
    check("PrecioCompra").exists().notEmpty().isDecimal(),
    check("Impuesto_ID").exists().notEmpty().isInt(),
    check("PrecioVenta").exists().notEmpty().isDecimal(),
    check("Ganancia").exists().notEmpty().isDecimal(),
    check("Imagen").exists().notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateObjectDataUpdate = [
    check("ID").exists().notEmpty().isInt(),
    check("Codigo").exists().notEmpty(),
    check("NombreDelProducto").exists().notEmpty(),
    check("Categoria_ID").exists().notEmpty().isInt(),
    check("Descripcion").exists().notEmpty(),
    check("PrecioCompra").exists().notEmpty().isDecimal(),
    check("Impuesto_ID").exists().notEmpty().isInt(),
    check("PrecioVenta").exists().notEmpty().isDecimal(),
    check("Ganancia").exists().notEmpty().isDecimal(),
    check("Imagen").exists().notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];


const validateId = [
    check("id").exists().isInt(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateId, validateObjectDataCreate, validateObjectDataUpdate };