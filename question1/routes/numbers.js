const express = require('express');
const router = express.Router();
const evenNoController = require('../models/controllers/evenNoController');

router.route('/')
    .post(evenNoController.getPrime);

module.exports = router;