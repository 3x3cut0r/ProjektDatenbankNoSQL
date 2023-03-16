const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const tweetsController = require('../controllers/users');

// create application/json parser
const jsonParser = bodyParser.json();

// get == getUser
router.get('/[Gg]et([Uu]ser)?/:id', tweetsController.findUser);

// save == saveUser
router.post('/[Ss]ave([Uu]ser)?', jsonParser, tweetsController.saveUser);

// delete == deleteUser
router.post('/[Dd]elete([Uu]ser)?/:id', tweetsController.deleteUser);

// fetchAll == getUsers
router.get('/[Ff]etch[Aa]ll', tweetsController.fetchAll);
router.get('/[Gg]et[Uu]sers', tweetsController.fetchAll);

module.exports = router;
