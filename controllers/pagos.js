const { matchedData } = require("express-validator");
const { detallePagosModel, datosPagosModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')


const createDetallePago = async(req, res) => {
    try {
        const body = req.body;
        console.log("detalle pago", body)

        // Iterar sobre el array de productos y crear cada detalle de venta
        const detallePagoPromises = body.map(async(pago) => {
            const detallePagoData = {
                Venta_ID: pago.Venta_ID,
                MetodoPago_ID: pago.MetodoPago_ID,
                MontoPago: pago.MontoPago,
            };

            return await detallePagosModel.create(detallePagoData);
        });

        // Esperar a que todas las operaciones de creación se completen
        const detallePagoResults = await Promise.all(detallePagoPromises);

        // Asegúrate de que los campos numéricos se envíen como números en lugar de cadenas
        const data = detallePagoResults.map(item => {
            let nombre = ''
            if (item.MetodoPago_ID == 1) {
                nombre = "Efectivo"
            } else if (item.MetodoPago_ID == 2) {
                nombre = "Tarjeta"
            } else {
                nombre = "Transferencia"
            }
            return {
                NombreMetodo: nombre,
                Monto: item.MontoPago
            };
        });

        res.send(data);

    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL DETALLE DEL PAGO ${e}`);
    }
}

const createDatosPago = async(req, res) => {
    try {
        const body = req.body;
        console.log("detalle metadatos pago", body)

        // Iterar sobre el array de productos y crear cada detalle de venta
        const detalleMetaDatosPromises = body.map(async(pago) => {
            const detalleMetaDatosPagoData = {
                Venta_ID: pago.Venta_ID,
                Campo: pago.Campo,
                Dato: pago.Dato,
            };

            return await datosPagosModel.create(detalleMetaDatosPagoData);
        });

        // Esperar a que todas las operaciones de creación se completen
        const detallePagoResults = await Promise.all(detalleMetaDatosPromises);

        res.send(detallePagoResults);
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR LOS METADATOS DEL PAGO ${e}`);
    }
}


module.exports = { createDetallePago, createDatosPago };