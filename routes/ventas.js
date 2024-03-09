const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId, validateCodigo } = require("../validators/productos")
const { getItems, getID, getItem, createItemVenta, createItemDetalleVenta, createFacturaImpresa, getItemsVentaDetalle, getFacturaImpresa } = require("../controllers/ventas")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')


router.get("/", checkAuth, getItems);
router.post("/", checkAuth, createItemVenta);
router.post("/detalle", checkAuth, createItemDetalleVenta)

router.post("/facturaImpresa", checkAuth, createFacturaImpresa)
router.post("/getFacturaImpresa", checkAuth, getFacturaImpresa)

router.post("/getDetalleVenta/", checkAuth, getItemsVentaDetalle);
module.exports = router;