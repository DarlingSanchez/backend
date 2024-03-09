const express = require("express");
const router = express.Router();
const { validateObjectDataCreate, validateId } = require("../validators/productos")
const { getItemsCategorias, getItemsImpuestos, getItemsUnidadesMedidas, obtenerUsuario } = require("../controllers/tablasfk")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')

//CATEGORIAS
router.get("/categorias/", checkAuth, getItemsCategorias);

//IMPUESTOS
router.get("/impuestos/", checkAuth, getItemsImpuestos);
router.get("/get-usuario/", checkAuth, obtenerUsuario);
router.get("/unidades-medidas/", checkAuth, getItemsUnidadesMedidas);

module.exports = router;