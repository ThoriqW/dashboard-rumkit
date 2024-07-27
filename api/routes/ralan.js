const express = require('express');
const { getRalan } = require('../controllers/ralanControllers');
const router = express.Router();

router.get('/', getRalan)

module.exports = router