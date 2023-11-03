const { matchedData } = require("express-validator");
const { productosModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')

const getItems = async(req, res) => {
    try {
        const user = req.user
        const data = await productosModel.findAll();

        //const usuario = await 
        ocultarPassword(user);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, e);
    }

};

const getItem = async(req, res) => {
    try {
        const user = req.user
        req = matchedData(req);
        const { id } = req;
        const data = await productosModel.findByPk(id);
        if (data === null) {
            res.send({ "mensaje": `NO EXISTE NINGUN PRODUCTO CON EL ID ${id}` })
        } else {
            ocultarPassword(user);
            res.send({ data, user });
        }

    } catch (e) {
        handleHttpError(res, "ERROR AL OBTENER EL PRODUCTO SOLICITADO");
    }

};

const createItem = async(req, res) => {
    try {
        const body = matchedData(req);
        const data = await productosModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR AL GUARDAR EL NUEVO PRODUCTO");
    }
}

const updateItem = async(req, res) => {
    const { id, ...body } = matchedData(req);
    try {
        //const data = await productosModel.findOneAndUpdate(id, body);
        const [numRowsUpdated] = await productosModel.update(body, {
            where: { id: id }
        });
        if (numRowsUpdated === 1) {
            res.send({ message: 'EL PRODUCTO SE ACTUALIZO' });
        } else {
            res.status(404).send({ message: 'EL PRODUCTO NO EXISTE' });
        }

    } catch (e) {
        console.log(e)
        handleHttpError(res, `ERROR AL ACTUALIZAR EL PRODUCTO CON ID ${id}`);
    }
}

const deleteItem = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const numDeletedRows = await productosModel.destroy({
            where: { id: id }
        });

        if (numDeletedRows === 1) {
            res.send({ message: 'SE ELIMINO EL PRODUCTO' });
        } else {
            res.status(404).send({ message: 'EL PRODUCTO NO EXISTE' });
        }


    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL INTENTAR ELIMINAR EL PRODUCTO");
    }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };