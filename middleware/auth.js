const { verifyToken } = require("../utils/handleToken");
const { handleErrorResponse, handleHttpError } = require("../utils/handleError");
const { usuariosModel } = require("../models");

const checkAuth = async(req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleErrorResponse(res, "ERROR TOKEN", 409);
            return;
        }
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        console.log(tokenData)
        if (!tokenData || (!tokenData.id && !tokenData.Nombre)) {
            handleErrorResponse(res, "TOKEN INCORRECTO", 409);
            return;
        }
        const user = await usuariosModel.findByPk(tokenData.id);
        req.user = user;
        next();
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = checkAuth;