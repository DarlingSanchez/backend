const { matchedData } = require("express-validator");
const { historialPreciosModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')



const getItems = async(req, res) => {

};


const getItem = async(req, res) => {

};

const getCodigo = async(req, res) => {

}


const createItem = async(req, res) => {

    const { body } = req;
    try {
        //const body = matchedData(req);
        // Iterar sobre el array de productos y crear cada detalle de compra
        const actualizarProducto = body.map(async(producto) => {

            const data = {
                Producto_ID: producto.id,
                PrecioCompra: producto.precioCompra,
                PrecioVenta: producto.precioVenta,
                PrecioVentaMayoreo: producto.totalVentaMayoreo,
            };

            return await historialPreciosModel.create(data);
        });

        // Esperar a que todas las operaciones de creación se completen
        const detalleCompraResults = await Promise.all(actualizarProducto);

        res.send(detalleCompraResults);
        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL NUEVO HISTORIAL ${e}`);
    }
}



module.exports = { createItem };