const express = require("express");
const { getAllFarmasi } = require("../controllers/farmasiControllers");
const router = express.Router();

router.get("/", getAllFarmasi);

module.exports = router;
