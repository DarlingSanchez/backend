const { encrypt, compare } = require("../utils/handleJwt");
const { handleHttpError, handleErrorResponse } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");

const { usuariosModel } = require("../models");
const { matchedData } = require("express-validator");


const loginCtrl = async(req, res) => {
    try {
        const body = matchedData(req);
        const user = await usuariosModel.findOne({
            where: { Email: body.Email }
        });
        if (!user) {
            handleErrorResponse(res, "USUARIO NO EXIXTE", 404);
            return;
        }
        const checkPassword = await compare(body.Password, user.Password);

        if (!checkPassword) {
            handleErrorResponse(res, "PASSWORD INVALIDA", 401);
            return;
        }

        const tokenJwt = await tokenSign(user);
        user.set('Password', undefined, { strict: false });
        const data = {
            token: tokenJwt,
            user: user,
        };

        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
};


const registerCtrl = async(req, res) => {
    try {
        const body = matchedData(req);
        // const checkIsExist = await usuariosModel.findOne({
        //   where: { email: body.email },
        // });
        const checkIsExist = await usuariosModel.findOne({
            where: { Email: body.Email }
        });

        if (checkIsExist) {
            handleErrorResponse(res, "USUARIO YA EXISTE", 401);
            return;
        }

        const Password = await encrypt(body.Password);
        const bodyInsert = {...body, Password };
        const dataUser = await usuariosModel.create(bodyInsert);
        dataUser.set('Password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        /* const data = await usuariosModel.findOne({
             where: { Email: 'sanchez@done.com.hn' },
             attributes: { exclude: ['Password'] }
         });*/
        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = { loginCtrl, registerCtrl };