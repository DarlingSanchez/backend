const { matchedData } = require("express-validator");
const { productosModel, categoriasModel, impuestosModel, storageModel, ventasModel, detalleVentasModel, empresaModel, facturaModel, clientesModel, facturaImpresaModel, usuariosModel } = require("../models");
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
        const dataRaw = await ventasModel.findAll({
            include: [{
                    model: usuariosModel,
                    as: 'Usuario',
                    attributes: ['Nombre'],
                },
                {
                    model: clientesModel,
                    as: 'Cliente',
                    attributes: ['Nombre'],
                }
            ],

            attributes: ['id', 'N_Factura', 'SubTotal', 'Descuento', 'Impuesto', 'Total', 'createdAt'],
            order: [
                ['ID', 'DESC']
            ]
        });

        // Asegúrate de que los campos numéricos se envíen como números en lugar de cadenas
        const data = dataRaw.map(item => {
            return {
                ID: item.id,
                N_Factura: item.N_Factura,
                Usuario: item.Usuario.Nombre,
                Cliente: item.Cliente.Nombre,
                SubTotal: item.SubTotal,
                Descuento: item.Descuento,
                Impuesto: item.Impuesto,
                Total: item.Total,
                Fecha: item.createdAt,
            };
        });

        ocultarPassword(user);
        res.send(data);
    } catch (e) {
        handleHttpError(res, e);
    }
};

const getItemsVentaDetalle = async(req, res) => {
    const { body } = req
    try {
        const dataRaw = await detalleVentasModel.findAll({
            where: { Venta_ID: body.Venta_ID },
            include: [{
                model: productosModel,
                as: 'Producto',
                attributes: ['NombreDelProducto'],
            }],

            attributes: ['id', "CantidadVendida", "Precio", "SubTotal", "Descuento", "Impuesto", "Total"],

        });

        // Asegúrate de que los campos numéricos se envíen como números en lugar de cadenas
        const data = dataRaw.map(item => {
            return {
                Venta_ID: item.id,
                Producto: item.Producto.NombreDelProducto,
                Cantidad: item.CantidadVendida,
                Precio: item.Precio,
                SubTotal: item.SubTotal,
                Descuento: item.Descuento,
                Impuesto: item.Impuesto,
                Total: item.Total,
            };
        });

        //ocultarPassword(user);
        res.send(data);
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
            console.log("Ultima ", ultimoValor)
            const ultimoNumeroFactura = parseInt(ultimoValor, 10);
            nuevoNumeroFactura = (ultimoNumeroFactura + 1).toString().padStart(8, '0');
            console.log("Numero de factura actual", ultimoNumeroFactura)
        } else {
            // No hay facturas en la base de datos, se crea la primera factura
            nuevoNumeroFactura = '00000001';
        }

        //OBETNER DATOS DE LA EMPRESA DE LA TABLA datos_empresa        
        const empresa = await empresaModel.findOne({
            where: { ID: 1 }
        });

        //OBETNER DATOS DE LA FACTURA DE LA TABLA datos_factura
        const facturaRaw = await facturaModel.findOne({
            where: { ID: 1 }
        });
        let desde = ''
        let hasta = ''

        if (facturaRaw) {
            desde = (facturaRaw.Desde).toString().padStart(8, '0');
            hasta = (facturaRaw.Hasta).toString().padStart(8, '0');
        }

        const factura = {
            CAI: facturaRaw.CAI,
            Desde: `${facturaRaw.Punto_Emision}-${facturaRaw.Establecimiento}-${facturaRaw.Tipo_Documento}-${desde}`,
            Hasta: `${facturaRaw.Punto_Emision}-${facturaRaw.Establecimiento}-${facturaRaw.Tipo_Documento}-${hasta}`,
            Fecha_Limite: facturaRaw.Fecha_Limite
        }

        nuevoNumeroFactura = `${facturaRaw.Punto_Emision}-${facturaRaw.Establecimiento}-${facturaRaw.Tipo_Documento}-${nuevoNumeroFactura}`
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

        const encabezadoRaw = await ventasModel.create(dataRaw);

        //OBETNER NOMBRE DEL CLIENTE
        const cliente = await clientesModel.findOne({
            where: { ID: encabezadoRaw.Cliente_ID }
        });
        // Asegúrate de que los campos numéricos se envíen como números en lugar de cadenas
        const encabezado = {
            id: encabezadoRaw.id,
            N_Factura: encabezadoRaw.N_Factura,
            RTN_Cliente: cliente.DNI_RTN,
            Nombre_Cliente: cliente.Nombre,
            createdAt: encabezadoRaw.createdAt
        }
        res.send({ empresa, factura, encabezado });
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
            let detalleVentaData = {}
            if (producto.tipoVenta === 'D') {
                detalleVentaData = {
                    Venta_ID: producto.venta_ID,
                    Producto_ID: producto.idProducto,
                    CantidadVendida: producto.cantidad,
                    Precio: producto.precioVenta,
                    SubTotal: producto.subTotalVenta,
                    Descuento: producto.descuentoVenta,
                    Impuesto: producto.impuestoVenta,
                    Total: parseFloat(producto.precioVenta) * producto.cantidad,
                    TipoVenta: producto.tipoVenta
                };
            } else {
                detalleVentaData = {
                    Venta_ID: producto.venta_ID,
                    Producto_ID: producto.idProducto,
                    CantidadVendida: producto.cantidad,
                    Precio: producto.precioVentaMayoreo,
                    SubTotal: producto.subTotalVentaMayoreo,
                    Descuento: producto.descuentoVenta,
                    Impuesto: producto.impuestoVentaMayoreo,
                    Total: parseFloat(producto.precioVentaMayoreo) * producto.cantidad,
                    TipoVenta: producto.tipoVenta
                };
            }


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

const createFacturaImpresa = async(req, res) => {
    const body = req.body;

    try {
        const Factura = facturaImpresaModel.create(body);
        if (Factura) {
            res.send(true);
        } else {
            res.send({ "Error": "Algo salio mal al Guardar factura impresa en DB" });
        }

        //res.send({ a: 1 })
    } catch (e) {
        handleHttpError(res, `ERROR AL GUARDAR EL LA FACTURA IMPRESA EN DB ${e}`);
    }
};

const getFacturaImpresa = async(req, res) => {
    const { body } = req
    try {
        const data = await facturaImpresaModel.findOne({
            where: { Venta_ID: body.Venta_ID }
        });

        //ocultarPassword(user);
        res.send(data);
    } catch (e) {
        handleHttpError(res, `ERROR AL OBTENER LA FACTURA IMPRESA DE LA DB ${e}`);
    }
};

module.exports = { getItems, getItem, createItemVenta, getID, getCodigo, createItemDetalleVenta, createFacturaImpresa, getItemsVentaDetalle, getFacturaImpresa };