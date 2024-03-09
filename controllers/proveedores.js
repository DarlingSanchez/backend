const { matchedData } = require("express-validator");
const { proveedoresModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')


const getID = async(req, res) => {

    const { body } = req
    console.log(body)

    try {
        // Verificar si el producto con el mismo código ya existe
        const codigoDuplicado = await proveedoresModel.findOne({
            where: { RTN: body.RTN }
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
        const data = await proveedoresModel.findAll();
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

        const data = await proveedoresModel.findByPk(id);

        if (data === null) {
            res.send({ "mensaje": `NO EXISTE NINGUN PROVEEDOR CON EL ID ${id}` })
        } else {
            ocultarPassword(user);
            res.send({ data });
        }
    } catch (e) {
        handleHttpError(res, "ERROR AL OBTENER EL PROVEEDOR SOLICITADO");
    }

};

const getCodigo = async(req, res) => {
    const { body } = req

    try {
        // Verificar si el proveedor con el mismo RTN ya existe
        const data = await proveedoresModel.findOne({
            where: { RTN: body.RTN }
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
        const codigoDuplicado = await proveedoresModel.findOne({
            where: { RTN: body.RTN }
        });

        if (codigoDuplicado) {
            // Manejar el caso de duplicado             
            handleHttpError(res, "EL RTN QUE INGRESO YA EXISTE");
            return;
        }
        const data = await proveedoresModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL NUEVO PROVEEDOR ${e}`);
    }
}

const updateItem = async(req, res) => {
    const { id, ...body } = matchedData(req);
    try {
        //const data = await productosModel.findOneAndUpdate(id, body);
        const [numRowsUpdated] = await proveedoresModel.update(body, {
            where: { id: id }
        });
        if (numRowsUpdated === 1) {
            res.send({ message: 'EL PROVEEDOR SE ACTUALIZO' });
        } else {
            res.status(404).send({ message: 'EL PROVEEDOR NO EXISTE' });
        }

    } catch (e) {
        console.log(e)
        handleHttpError(res, `ERROR AL ACTUALIZAR EL PROVEEDOR CON CODIGO ${body.Codigo}`);
    }
}

const deleteItem = async(req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const numDeletedRows = await proveedoresModel.destroy({
            where: { id: id }
        });

        if (numDeletedRows === 1) {
            res.send({ message: 'SE ELIMINO EL PROVEEDOR' });
        } else {
            res.status(404).send({ message: 'EL PROVEEDOR NO EXISTE' });
        }


    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL INTENTAR ELIMINAR EL PROVEEDOR");
    }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getID, getCodigo };