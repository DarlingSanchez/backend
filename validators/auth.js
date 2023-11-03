const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateLogin = [
    check("Email").exists().notEmpty().isEmail(),
    check("Password").exists().notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateRegister = [
    check("Nombre").exists().notEmpty().isString(),
    check("Email").exists().notEmpty().isEmail(),
    check("Password").exists().notEmpty(),
    check("Rol_ID").exists().notEmpty().isInt(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateLogin, validateRegister };