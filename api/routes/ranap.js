const express = require("express");
const { getRanap } = require("../controllers/ranapControllers");
const router = express.Router();

router.get("/", getRanap);

module.exports = router;
