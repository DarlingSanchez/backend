const { matchedData } = require("express-validator");
const { categoriasModel, impuestosModel, unidadesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')

//OBETENER TODAS LAS CATEGORIAS
const getItemsCategorias = async(req, res) => {
    try {
        const user = req.user
        const data = await categoriasModel.findAll();

        //const usuario = await 
        ocultarPassword(user);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, e);
    }

};

//OBETENER TODAS LAS IMPUESTOS
const getItemsImpuestos = async(req, res) => {
    try {
        const user = req.user
        const data = await impuestosModel.findAll();

        //const usuario = await 
        ocultarPassword(user);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, e);
    }

};

//OBETENER TODAS LAS UNIDADES_MEDIDAS
const getItemsUnidadesMedidas = async(req, res) => {
    try {
        const user = req.user
        const data = await unidadesModel.findAll();

        //const usuario = await 
        ocultarPassword(user);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, e);
    }

};


module.exports = { getItemsCategorias, getItemsImpuestos, getItemsUnidadesMedidas };