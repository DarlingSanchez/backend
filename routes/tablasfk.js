const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/productos")
const { getItemsCategorias, getItemsImpuestos, getItemsUnidadesMedidas } = require("../controllers/tablasfk")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

//CATEGORIAS
router.get("/categorias/", checkAuth, checkRoleAuth([1]), getItemsCategorias);

//IMPUESTOS
router.get("/impuestos/", checkAuth, checkRoleAuth([1]), getItemsImpuestos);
router.get("/unidades-medidas/", checkAuth, checkRoleAuth([1]), getItemsUnidadesMedidas);

module.exports = router;