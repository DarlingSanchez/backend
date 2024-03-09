const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateObjectDataCreate = [
    check("Codigo").exists().notEmpty(),
    check("NombreDelProducto").exists().notEmpty(),
    check("Categoria_ID").exists().notEmpty().isInt(),
    check("Descripcion").exists().notEmpty(),
    check("Stock").exists().notEmpty().isDecimal(),
    check("UM_ID").exists().notEmpty().isInt(),
    check("PrecioCompra").exists().notEmpty().isDecimal(),
    check("Impuesto_ID").exists().notEmpty().isInt(),
    check("PrecioVenta").exists().notEmpty().isDecimal(),
    check("PrecioVentaMayoreo").exists(),
    check("Activo").exists().notEmpty().isLength({ min: 1, max: 1 }),
    check("Archivo_ID").exists().notEmpty(),
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
    check("Stock").exists().notEmpty().isDecimal(),
    check("UM_ID").exists().notEmpty().isInt(),
    check("PrecioCompra").exists().notEmpty().isDecimal(),
    check("Impuesto_ID").exists().notEmpty().isInt(),
    check("PrecioVenta").exists().notEmpty().isDecimal(),
    check("PrecioVentaMayoreo").exists(),
    check("Activo").exists().notEmpty().isLength({ min: 1, max: 1 }),
    check("Archivo_ID").exists().notEmpty(),
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
const validateCodigo = [
    check("Codigo").exists(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateId, validateObjectDataCreate, validateObjectDataUpdate, validateCodigo };