const express = require('express');
const router = express.Router();

// Controladores
const SubmitData = require("../controllers/SubmitData.controller");

// Ruta de ejemplo
router.post('/submit', SubmitData.insertData);

module.exports = router;
