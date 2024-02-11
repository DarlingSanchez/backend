const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");


const validateObjectDataCreate = [
    check("Nombre").exists().notEmpty(),
    check("DNI_RTN").exists().notEmpty(),
    check("CorreoElectronico").exists().notEmpty().isEmail(),
    check("Telefono").exists().notEmpty(),
    check("Direccion").exists(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateObjectDataUpdate = [
    check("ID").exists().notEmpty().isInt(),
    check("Nombre").exists().notEmpty(),
    check("DNI_RTN").exists().notEmpty(),
    check("CorreoElectronico").exists().notEmpty().isEmail(),
    check("Telefono").exists().notEmpty(),
    check("Direccion").exists(),
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