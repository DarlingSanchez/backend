const { matchedData } = require("express-validator");
const { productosModel, categoriasModel, impuestosModel, storageModel, comprasModel, detalleComprasModel } = require("../models");
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

const createItemCompra = async(req, res) => {
    const user = req.user
    const body = req.body;
    console.log("compras", body)
    try {
        dataRaw = {
            Usuario_ID: user.id,
            Proveedor_ID: body.Proveedor_ID,
            N_FacturaProveedor: body.N_FacturaProveedor,
            SubTotal: body.SubTotal,
            Descuento: body.Descuento,
            Impuesto: body.Impuesto,
            Total: body.Total
        }
        const data = await comprasModel.create(dataRaw);
        res.send(data);
        //res.send({ a: 1 });
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR LA COMPRA ${e}`);
    }
}
const createItemDetalleCompra = async(req, res) => {
    const user = req.user;
    const body = req.body;
    console.log("detalle compras", body)

    try {

        // Iterar sobre el array de productos y crear cada detalle de compra
        const detalleCompraPromises = body.map(async(producto) => {
            const detalleCompraData = {
                Compra_ID: producto.compra_ID,
                Producto_ID: producto.idProducto,
                CantidadComprada: producto.cantidad,
                Precio: producto.precioCompra,
                SubTotal: producto.subTotalCompra,
                Descuento: producto.descuento,
                Impuesto: producto.impuestoCompra,
                Total: parseFloat(producto.precioCompra) * producto.cantidad
            };

            return await detalleComprasModel.create(detalleCompraData);
        });

        // Esperar a que todas las operaciones de creación se completen
        const detalleCompraResults = await Promise.all(detalleCompraPromises);

        res.send(detalleCompraResults);
        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR LA COMPRA ${e}`);
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

module.exports = { getItems, getItem, createItemCompra, updateItem, deleteItem, getID, getCodigo, createItemDetalleCompra };