const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/historialprecios")
const { createItem } = require("../controllers/historialPrecios")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')


//router.get("/", checkAuth, checkRoleAuth([1]), getItems);
//router.get("/:id", checkAuth, validateId, getItem);
router.post("/", checkAuth, createItem);


module.exports = router;