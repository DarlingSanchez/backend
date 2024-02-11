const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateObjectDataCreateDetallePagos = [
    check("Venta_ID").exists().notEmpty(),
    check("MetodoPago_ID").exists().notEmpty(),
    check("MontoPago").exists().notEmpty().isInt(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateObjectDataCreateDatosPagos = [
    check("Venta_ID").exists().notEmpty(),
    check("Campo").exists().notEmpty(),
    check("Dato").exists().notEmpty().isInt(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = { validateObjectDataCreateDetallePagos, validateObjectDataCreateDatosPagos };