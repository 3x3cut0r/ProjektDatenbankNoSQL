const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const itemsController = require('../controllers/items');

// create application/json parser
const jsonParser = bodyParser.json();

// fetchAll == getItems
router.get('/[Ff]etch[Aa]ll', itemsController.fetchAll);
router.get('/[Gg]et[Ii]tems', itemsController.fetchAll);

// get == getItem
router.get('/[Gg]et([Ii]tem)?/:uuid', itemsController.getItem);

// add == addItem
router.post('/[Aa]dd([Ii]tem)?', jsonParser, itemsController.addItem);

// update == updateItem
router.put(
  '/[Uu]pdate([Ii]tem)?/:uuid',
  jsonParser,
  itemsController.updateItem
);

module.exports = router;
