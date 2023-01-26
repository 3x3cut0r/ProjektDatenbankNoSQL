const express = require('express');
const router = express.Router({ caseSensitive: true });
const indexController = require('../controllers/index');

router.get('/', indexController.getIndex);

module.exports = router;
