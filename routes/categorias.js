const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/categorias")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/categorias")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

router.get("/", checkAuth, checkRoleAuth([1]), getItems);
router.get("/:id", checkAuth, validateId, getItem);
router.post("/", validateObjectDataCreate, createItem);
router.put("/:id", validateId, validateObjectDataCreate, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;