const express = require('express');
const router = express.Router();
const evenNoController = require('../controllers/evenNoController');

router.route('/')
    .post(evenNoController.getPrime);

module.exports = router;