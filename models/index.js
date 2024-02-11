const { Categorias, Impuestos, Unidades_Medidas } = require('./mysql/tablasfk');
const { Compras, DetalleCompras } = require('./mysql/compras')
const { Ventas, DetalleVentas } = require('./mysql/ventas')
const { DetallePagos, DatosPago } = require('./mysql/pagos')

const models = {
    categoriasModel: Categorias,
    unidadesModel: Unidades_Medidas,
    productosModel: require('./mysql/productos'),
    historialPreciosModel: require('./mysql/historialPrecios'),
    impuestosModel: Impuestos,
    usuariosModel: require('./mysql/usuarios'),
    storageModel: require('./mysql/storage'),
    proveedoresModel: require('./mysql/proveedores'),
    clientesModel: require('./mysql/clientes'),
    comprasModel: Compras,
    detalleComprasModel: DetalleCompras,
    ventasModel: Ventas,
    detalleVentasModel: DetalleVentas,
    detallePagosModel: DetallePagos,
    datosPagosModel: DatosPago
};


module.exports = models;