const { Categorias, Impuestos, Unidades_Medidas } = require('./mysql/tablasfk');
const { Compras, DetalleCompras } = require('./mysql/compras')
const { Ventas, DetalleVentas } = require('./mysql/ventas')
const { Datos_Factura, Factura_Impresa } = require('./mysql/factura')
const { MetodosPago, DetallePagos, DatosPago } = require('./mysql/pagos')

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
    metodosPagoModel: MetodosPago,
    detallePagosModel: DetallePagos,
    datosPagosModel: DatosPago,
    empresaModel: require('./mysql/empresa'),
    facturaModel: Datos_Factura,
    facturaImpresaModel: Factura_Impresa,
};


module.exports = models;