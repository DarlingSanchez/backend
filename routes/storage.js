const express = require("express");
const router = express.Router();
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage");
const { validateId } = require("../validators/storage");
const { upload } = require("../utils/handleStorage");
const checkAuth = require("../middleware/auth");



router.post("/", checkAuth, upload.single("file"), createItem);

router.get("/", checkAuth, validateId, getItems);


router.get("/:id", checkAuth, validateId, getItem);

router.delete("/:id", checkAuth, validateId, deleteItem);



module.exports = router;