const express = require('express');
const { getAllPatients } = require('../controllers/patientsControllers');
const router = express.Router();

router.get('/', getAllPatients)

module.exports = router