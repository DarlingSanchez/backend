const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId, validateCodigo } = require("../validators/productos")
const { getItems, getID, getItem, createItemCompra, createItemDetalleCompra, updateItem, deleteItem, getCodigo } = require("../controllers/compras")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')


router.get("/", checkAuth, checkRoleAuth([1]), getItems);
router.post("/", checkAuth, createItemCompra);
router.post("/detalle", checkAuth, createItemDetalleCompra)

module.exports = router;