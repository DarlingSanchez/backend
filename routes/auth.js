const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../validators/auth");


router.post("/registro", validateRegister, registerCtrl);


router.post("/login", validateLogin, loginCtrl);

module.exports = router;