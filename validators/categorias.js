const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateObjectDataCreate = [
    //check("ID").exists().notEmpty(),
    check("NombreCategoria").exists().notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateObjectDataUpdate = [
    //check("ID").exists().notEmpty(),
    check("NombreCategoria").exists().notEmpty(),
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