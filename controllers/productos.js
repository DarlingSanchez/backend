const { matchedData } = require("express-validator");
const { productosModel, categoriasModel, impuestosModel, storageModel, unidadesModel } = require("../models");
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
                PrecioVentaMayoreo: parseFloat(item.PrecioVentaMayoreo), // Convierte a número
                Impuesto: parseFloat(item.Impuesto.Porcentaje), // Convierte a número
                Activo: item.Activo,
                Imagen: item.Archivo.Url,
            };
        });

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
        //const data2 = await productosModel.findByPk(id);

        const dataRaw = await productosModel.findByPk(id, {
            include: [{
                model: storageModel,
                as: 'Archivo',
                attributes: ['Url'],
            }, ],
            attributes: ['id', 'Codigo', 'NombreDelProducto', 'Categoria_ID', 'Descripcion', 'Stock', 'UM_ID', 'PrecioCompra', 'Impuesto_ID', 'PrecioVenta', 'PrecioVentaMayoreo', 'Activo', 'Archivo_ID'],
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
            PrecioVentaMayoreo: dataRaw.PrecioVentaMayoreo,
            Activo: dataRaw.Activo,
            Archivo_ID: dataRaw.Archivo_ID,
            Imagen: dataRaw.Archivo ? dataRaw.Archivo.Url : '', // Verificar si hay una imagen
        };

        if (data === null) {
            res.send({ "mensaje": `NO EXISTE NINGUN PRODUCTO CON EL ID ${id}` })
        } else {
            ocultarPassword(user);
            res.send({ data });
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
            attributes: ['id', 'Codigo', 'NombreDelProducto', 'Descripcion', 'Stock', 'PrecioCompra', 'Impuesto_ID', 'PrecioVenta', 'PrecioVentaMayoreo', 'Ganancia', 'Activo', 'Archivo_ID'],
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
                PrecioVentaMayoreo: dataRaw.PrecioVentaMayoreo,
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

const createItem = async(req, res) => {
    try {
        const body = matchedData(req);
        console.log(body)
            // Verificar si el producto con el mismo código ya existe
        const codigoDuplicado = await productosModel.findOne({
            where: { Codigo: body.Codigo }
        });

        if (codigoDuplicado) {
            // Manejar el caso de duplicado             
            handleHttpError(res, "EL CODIGO QUE INGRESO YA EXISTE");
            return;
        }
        const data = await productosModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL NUEVO PRODUCTO ${e}`);
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
        handleHttpError(res, `ERROR AL ACTUALIZAR EL PRODUCTO CON CODIGO ${body.Codigo}`);
    }
}
const patchItemCompra = async(req, res) => {
    const { body } = req;
    try {
        // Iterar sobre el array de productos y crear cada detalle de compra
        const actualizarProducto = body.map(async(producto) => {
            const { Stock: stockActual } = await productosModel.findByPk(producto.id, {
                attributes: ['Stock']
            });

            console.log(producto.id, stockActual, producto.cantidad)
            const impuesto = '1.' + producto.impuestoPorcentaje
            const ganancia = (parseFloat(producto.precioVenta) / parseFloat(impuesto)) - (parseFloat(producto.precioCompra) / parseFloat(impuesto))
            const stock = parseFloat(producto.cantidad) + parseFloat(stockActual)

            const data = {
                id: producto.id,
                Stock: stock,
                PrecioCompra: producto.precioCompra,
                PrecioVenta: producto.precioVenta,
                PrecioVentaMayoreo: producto.totalVentaMayoreo || 0,
            };

            //return await detalleComprasModel.create(detalleCompraData);
            console.log("ACTUALIZANDO")
            return await productosModel.update(data, {
                where: { id: data.id }
            });
        });

        // Esperar a que todas las operaciones de creación se completen
        const detalleCompraResults = await Promise.all(actualizarProducto);

        res.send(detalleCompraResults);
        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL RESTAR INVENTARIO Y MODIFICAR EL PRODUCTO ${e}`);
    }
}

const patchItemVenta = async(req, res) => {
    const { body } = req;
    try {
        // Iterar sobre el array de productos y crear cada detalle de venta
        const actualizarProducto = body.map(async(producto) => {
            const { Stock: stockActual } = await productosModel.findByPk(producto.id, {
                attributes: ['Stock']
            });

            //console.log(producto.id, stockActual, producto.cantidad)

            const stock = parseFloat(stockActual) - parseFloat(producto.cantidad)

            const data = {
                id: producto.id,
                Stock: stock,
            };

            //return await detalleComprasModel.create(detalleCompraData);
            console.log("ACTUALIZANDO")
            return await productosModel.update(data, {
                where: { id: data.id }
            });
        });

        // Esperar a que todas las operaciones de creación se completen
        const detalleCompraResults = await Promise.all(actualizarProducto);

        res.send(detalleCompraResults);
        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL SUMAR INVENTARIO A LOS PRODUCTOS ${e}`);
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getID, getCodigo, patchItemCompra, patchItemVenta };