const express = require('express');
const router = express.Router({ caseSensitive: true });
const testController = require('../controllers/test');

router.get('/', testController.getTest);

router.post('/', testController.postTest);

module.exports = router;
