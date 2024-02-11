const express = require("express");
const router = express.Router();
const { validateObjectDataCreateDetallePagos, validateObjectDataCreateDatosPagos } = require("../validators/pagos")
const { createDetallePago, createDatosPago } = require("../controllers/pagos")
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/rol')


router.post("/", checkAuth, createDetallePago);
router.post("/datos", checkAuth, createDatosPago);

module.exports = router;