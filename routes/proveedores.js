const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/proveedores")
const { getItems, getID, getItem, createItem, updateItem, deleteItem, getCodigo } = require("../controllers/proveedores")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

router.post("/verificar/", checkAuth, getID);
router.post("/codigo/", checkAuth, getCodigo);
router.get("/", checkAuth, checkRoleAuth([1]), getItems);
router.get("/:id", checkAuth, validateId, getItem);
router.post("/", validateObjectDataCreate, createItem);
router.put("/:id", validateId, validateObjectDataCreate, updateItem);
router.delete("/:id", validateId, deleteItem);


module.exports = router;