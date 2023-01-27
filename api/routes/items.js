const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const itemsController = require('../controllers/items');

// create application/json parser
const jsonParser = bodyParser.json();

// get == getItem
router.get('/[Gg]et([Ii]tem)?/:id', itemsController.findItem);

// save == saveItem
router.post('/[Ss]ave([Ii]tem)?', jsonParser, itemsController.saveItem);

// delete == deleteItem
router.post('/[Dd]elete([Ii]tem)?/:id', itemsController.deleteItem);

// fetchAll == getItems
router.get('/[Ff]etch[Aa]ll', itemsController.fetchAll);
router.get('/[Gg]et[Ii]tems', itemsController.fetchAll);

module.exports = router;
