const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/clientes")
const { getItems, getID, getItem, createItem, updateItem, deleteItem, getCodigo } = require("../controllers/clientes")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

router.post("/verificar/", checkAuth, getID);
router.post("/codigo/", checkAuth, getCodigo);
router.get("/", checkAuth, getItems);
router.get("/:id", checkAuth, validateId, getItem);
router.post("/", checkAuth, validateObjectDataCreate, createItem);
router.put("/:id", checkAuth, validateId, validateObjectDataCreate, updateItem);
router.delete("/:id", checkAuth, validateId, deleteItem);


module.exports = router;