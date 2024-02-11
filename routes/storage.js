const express = require("express");
const router = express.Router();
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage");
const { validateId } = require("../validators/storage");
const { upload } = require("../utils/handleStorage");


router.post("/", upload.single("file"), createItem);

router.get("/", validateId, getItems);


router.get("/:id", validateId, getItem);

router.delete("/:id", validateId, deleteItem);



module.exports = router;