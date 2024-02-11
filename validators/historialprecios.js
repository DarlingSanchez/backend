const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateObjectDataCreate = [
    check("Producto_ID").exists().notEmpty(),
    check("PrecioCompra").exists().notEmpty().isDecimal(),
    check("PrecioVenta").exists().notEmpty().isDecimal(),
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

module.exports = { validateId, validateObjectDataCreate };