const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId, validateCodigo } = require("../validators/productos")
const { getItems, getID, getItem, createItem, updateItem, deleteItem, getCodigo, patchItemCompra, patchItemVenta } = require("../controllers/productos")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

router.post("/verificar/", checkAuth, getID);
router.post("/codigo/", checkAuth, getCodigo);
router.get("/", checkAuth, getItems);
router.get("/:id", checkAuth, validateId, getItem);
router.post("/", checkAuth, validateObjectDataCreate, createItem);
router.put("/:id", checkAuth, validateId, validateObjectDataCreate, updateItem);
router.delete("/:id", checkAuth, validateId, deleteItem);
router.patch("/", checkAuth, patchItemCompra);
router.patch("/venta", checkAuth, patchItemVenta);

module.exports = router;