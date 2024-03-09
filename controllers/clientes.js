const { matchedData } = require("express-validator");
const { clientesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')


const getID = async(req, res) => {

    const { body } = req
    console.log(body)

    try {
        // Verificar si el producto con el mismo código ya existe
        const codigoDuplicado = await clientesModel.findOne({
            where: { DNI_RTN: body.RTN }
        });

        if (codigoDuplicado) {
            res.send(true);
        } else {
            res.send(false);
        }

    } catch (e) {
        handleHttpError(res, e);
    }

};


const getItems = async(req, res) => {
    try {
        const user = req.user
        const data = await clientesModel.findAll();
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

        const data = await clientesModel.findByPk(id);

        if (data === null) {
            res.send({ "mensaje": `NO EXISTE NINGUN CLIENTE CON EL ID ${id}` })
        } else {
            ocultarPassword(user);
            res.send({ data });
        }
    } catch (e) {
        handleHttpError(res, "ERROR AL OBTENER EL CLIENTE SOLICITADO");
    }

};

const getCodigo = async(req, res) => {
    const { body } = req

    try {
        // Verificar si el cliente con el mismo RTN ya existe
        const data = await clientesModel.findOne({
            where: { DNI_RTN: body.RTN }
        });

        if (data) {
            res.send(data);
        } else {
            res.send(false);
        }

    } catch (e) {
        handleHttpError(res, e);
    }
}

const createItem = async(req, res) => {
    try {
        const body = matchedData(req);
        console.log(body)
            // Verificar si el producto con el mismo código ya existe
        const codigoDuplicado = await clientesModel.findOne({
            where: { DNI_RTN: body.DNI_RTN }
        });

        if (codigoDuplicado) {
            // Manejar el caso de duplicado             
            handleHttpError(res, "EL RTN QUE INGRESO YA EXISTE");
            return;
        }
        const data = await clientesModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL NUEVO CLIENTE ${e}`);
    }
}

const updateItem = async(req, res) => {
    const { id, ...body } = matchedData(req);
    try {
        //const data = await productosModel.findOneAndUpdate(id, body);
        const [numRowsUpdated] = await clientesModel.update(body, {
            where: { id: id }
        });
        if (numRowsUpdated === 1) {
            res.send({ message: 'EL CLIENTE SE ACTUALIZO' });
        } else {
            res.status(404).send({ message: 'EL CLIENTE NO EXISTE' });
        }

    } catch (e) {
        console.log(e)
        handleHttpError(res, `ERROR AL ACTUALIZAR EL CLIENTE CON CODIGO ${body.Codigo}`);
    }
}

const deleteItem = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const numDeletedRows = await clientesModel.destroy({
            where: { id: id }
        });

        if (numDeletedRows === 1) {
            res.send({ message: 'SE ELIMINO EL CLIENTE' });
        } else {
            res.status(404).send({ message: 'EL CLIENTE NO EXISTE' });
        }


    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL INTENTAR ELIMINAR EL CLIENTE");
    }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getID, getCodigo };