const { matchedData } = require("express-validator");
const { categoriasModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')

const getItems = async(req, res) => {
    try {
        const user = req.user
        const data = await categoriasModel.findAll();

        //const usuario = await 
        ocultarPassword(user);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }

};


const getItem = async(req, res) => {
    try {
        const user = req.user
        req = matchedData(req);
        const { id } = req;
        const data = await categoriasModel.findByPk(id);
        if (data === null) {
            res.send({ "mensaje": `NO EXISTE NINGUNA CATEGORIA CON EL ID ${id}` })
        } else {
            ocultarPassword(user);
            res.send({ data });
        }

    } catch (e) {
        handleHttpError(res, "ERROR AL OBTENER LA CATEGORIA SOLICITADA");
    }

};

const createItem = async(req, res) => {
    try {
        const body = matchedData(req);
        const data = await categoriasModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR AL GUARDAR LA NUEVA CATEGORIA");
    }
}

const updateItem = async(req, res) => {
    const { id, ...body } = matchedData(req);
    try {
        //const data = await categoriasModel.findOneAndUpdate(id, body);
        const [numRowsUpdated] = await categoriasModel.update(body, {
            where: { id: id }
        });
        if (numRowsUpdated === 1) {
            res.send({ message: 'LA CATEGORIA SE ACTUALIZO' });
        } else {
            res.status(404).send({ message: 'LA CATEGOSIA NO EXISTE' });
        }

    } catch (e) {
        console.log(e)
        handleHttpError(res, `ERROR AL ACTUALIZAR LA CATEGORIA CON ID ${id}`);
    }
}

const deleteItem = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const numDeletedRows = await categoriasModel.destroy({
            where: { id: id }
        });

        if (numDeletedRows === 1) {
            res.send({ message: 'SE ELIMINO LA CATEGORIA' });
        } else {
            res.status(404).send({ message: 'LA CATEGORIA NO EXISTE' });
        }


    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL INTENTAR ELIMINAR LA CATEGORIA");
    }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };