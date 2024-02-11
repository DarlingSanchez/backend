const { matchedData } = require("express-validator");
const { productosModel, categoriasModel, impuestosModel, storageModel, ventasModel, detalleVentasModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const ocultarPassword = require('../utils/hidePassword')


const getID = async(req, res) => {

    const { body } = req
    console.log(body)

    try {
        // Verificar si el producto con el mismo código ya existe
        const codigoDuplicado = await productosModel.findOne({
            where: { Codigo: body.Codigo }
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
        const dataRaw = await productosModel.findAll({
            include: [{
                    model: categoriasModel,
                    as: 'Categoria',
                    attributes: ['NombreCategoria'],
                },
                {
                    model: impuestosModel,
                    as: 'Impuesto',
                    attributes: ['Porcentaje'],
                },
                {
                    model: storageModel,
                    as: 'Archivo',
                    attributes: ['Url'],
                }
            ],

            attributes: ['id', 'Codigo', 'NombreDelProducto', 'Descripcion', 'Stock', 'PrecioVenta', 'Activo'],
        });

        // Asegúrate de que los campos numéricos se envíen como números en lugar de cadenas
        const data = dataRaw.map(item => {
            return {
                ID: item.id,
                Codigo: item.Codigo,
                NombreDelProducto: item.NombreDelProducto,
                Descripcion: item.Descripcion,
                Categoria: item.Categoria.NombreCategoria,
                Stock: parseFloat(item.Stock), // Convierte a número
                PrecioVenta: parseFloat(item.PrecioVenta), // Convierte a número
                Impuesto: parseFloat(item.Impuesto.Porcentaje), // Convierte a número
                Activo: item.Activo,
                Imagen: item.Archivo.Url,
            };
        });

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
        //const data2 = await productosModel.findByPk(id);

        const dataRaw = await productosModel.findByPk(id, {
            include: [{
                model: storageModel,
                as: 'Archivo',
                attributes: ['Url'],
            }, ],
            attributes: ['id', 'Codigo', 'NombreDelProducto', 'Categoria_ID', 'Descripcion', 'Stock', 'UM_ID', 'PrecioCompra', 'Impuesto_ID', 'PrecioVenta', 'Ganancia', 'Activo', 'Archivo_ID'],
        });

        const data = {
            id: dataRaw.id,
            Codigo: dataRaw.Codigo,
            NombreDelProducto: dataRaw.NombreDelProducto,
            Categoria_ID: dataRaw.Categoria_ID,
            Descripcion: dataRaw.Descripcion,
            Stock: dataRaw.Stock,
            UM_ID: dataRaw.UM_ID,
            PrecioCompra: dataRaw.PrecioCompra,
            Impuesto_ID: dataRaw.Impuesto_ID,
            PrecioVenta: dataRaw.PrecioVenta,
            Ganancia: dataRaw.Ganancia,
            Activo: dataRaw.Activo,
            Archivo_ID: dataRaw.Archivo_ID,
            Imagen: dataRaw.Archivo ? dataRaw.Archivo.Url : '', // Verificar si hay una imagen
        };

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

const getCodigo = async(req, res) => {
    const { body } = req
    try {
        // Verificar si el producto con el mismo código ya existe
        const dataRaw = await productosModel.findOne({
            where: { Codigo: body.Codigo },
            include: [{
                    model: impuestosModel,
                    as: 'Impuesto',
                    attributes: ['Porcentaje'],
                },
                {
                    model: storageModel,
                    as: 'Archivo',
                    attributes: ['Url'],
                }
            ],
            attributes: ['id', 'Codigo', 'NombreDelProducto', 'Descripcion', 'Stock', 'PrecioCompra', 'Impuesto_ID', 'PrecioVenta', 'Ganancia', 'Activo', 'Archivo_ID'],
        });

        if (dataRaw) {
            const data = {
                id: dataRaw.id,
                Codigo: dataRaw.Codigo,
                NombreDelProducto: dataRaw.NombreDelProducto,
                Descripcion: dataRaw.Descripcion,
                Stock: dataRaw.Stock,
                PrecioCompra: dataRaw.PrecioCompra,
                Impuesto: dataRaw.Impuesto.Porcentaje,
                PrecioVenta: dataRaw.PrecioVenta,
                Ganancia: dataRaw.Ganancia,
                Activo: dataRaw.Activo === 'S' ? true : false,
                Archivo_ID: dataRaw.Archivo_ID,
                Imagen: dataRaw.Archivo ? dataRaw.Archivo.Url : '', // Verificar si hay una imagen
            };
            res.send(data);
        } else {
            res.send(false);
        }

    } catch (e) {
        handleHttpError(res, e);
    }
}

const createItemVenta = async(req, res) => {
    const user = req.user
    const body = req.body;
    try {
        // Busca la última factura en tu base de datos
        const ultimaFactura = await ventasModel.findOne({
            attributes: ['N_Factura'], // Selecciona solo la columna N_Factura
            order: [
                    ['ID', 'DESC']
                ] // Ordena por ID en orden descendente
        });

        let nuevoNumeroFactura = 0;
        if (ultimaFactura) {
            const ultimoValor = ultimaFactura.N_Factura.split("-").pop();

            const ultimoNumeroFactura = parseInt(ultimoValor, 10);
            nuevoNumeroFactura = (ultimoNumeroFactura + 1).toString().padStart(8, '0');
            console.log("Numero de factura actual", ultimoNumeroFactura)
        } else {
            // No hay facturas en la base de datos, se crea la primera factura
            nuevoNumeroFactura = '00000001';
        }

        nuevoNumeroFactura = '000-001-01-' + nuevoNumeroFactura
        console.log('Próximo número de factura:', nuevoNumeroFactura);

        // Crear la nueva factura
        const dataRaw = {
            Usuario_ID: user.id,
            Cliente_ID: body.Cliente_ID,
            N_Factura: nuevoNumeroFactura,
            SubTotal: body.SubTotal,
            Descuento: body.Descuento,
            Impuesto: body.Impuesto,
            Total: body.Total
        };

        const data = await ventasModel.create(dataRaw);
        res.send(data);
    } catch (error) {
        handleHttpError(res, `ERROR AL GUARDAR LA VENTA ${error}`);
    }
}


const createItemDetalleVenta = async(req, res) => {
    const body = req.body;
    console.log("detalle venta", body)

    try {
        // Iterar sobre el array de productos y crear cada detalle de venta
        const detalleVentaPromises = body.map(async(producto) => {
            const detalleVentaData = {
                Venta_ID: producto.venta_ID,
                Producto_ID: producto.idProducto,
                CantidadVendida: producto.cantidad,
                Precio: producto.precioVenta,
                SubTotal: producto.subTotalVenta,
                Descuento: producto.descuentoVenta,
                Impuesto: producto.impuestoVenta,
                Total: parseFloat(producto.precioVenta) * producto.cantidad
            };

            return await detalleVentasModel.create(detalleVentaData);
        });

        // Esperar a que todas las operaciones de creación se completen
        const detalleVentaResults = await Promise.all(detalleVentaPromises);

        res.send(detalleVentaResults);
        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL DETALLE DE LA VENTA ${e}`);
    }
};


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
        handleHttpError(res, `ERROR AL ACTUALIZAR EL PRODUCTO CON CODIGO ${body.Codigo}`);
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

module.exports = { getItems, getItem, createItemVenta, updateItem, deleteItem, getID, getCodigo, createItemDetalleVenta };