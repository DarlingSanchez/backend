const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId, validateCodigo } = require("../validators/productos")
const { getItems, getID, getItem, createItemVenta, createItemDetalleVenta, updateItem, deleteItem, getCodigo } = require("../controllers/ventas")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')


router.get("/", checkAuth, checkRoleAuth([1]), getItems);
router.post("/", checkAuth, createItemVenta);
router.post("/detalle", checkAuth, createItemDetalleVenta)

module.exports = router;