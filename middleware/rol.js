const { handleErrorResponse, handleHttpError } = require("../utils/handleError");


const checkRoleAuth = (roles) => async(req, res, next) => {
    try {

        const { user } = req;
        let rolesByUser = user.Rol_ID
        if (!Array.isArray(rolesByUser)) {
            // Si no es un array, puedes convertirlo a un array, por ejemplo:
            rolesByUser = [rolesByUser];
        }
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));


        if (!checkValueRol) {
            handleErrorResponse(res, "USUARIO SIN ROL DE PERMISOS", 409);
            return;
        }
        next();
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = checkRoleAuth;