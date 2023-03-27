const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const tweetsController = require('../controllers/tweets');

// create application/json parser
const jsonParser = bodyParser.json();

// get == getTweet
router.get('/[Gg]et([Tt]weet)?/:id', tweetsController.findTweet);

// save == saveTweet
router.post('/[Ss]ave([Tt]weet)?', jsonParser, tweetsController.saveTweet);

// delete == deleteTweet
router.post('/[Dd]elete([Tt]weet)?/:id', tweetsController.deleteTweet);

// like == likeTweet
router.post('/[Ll]ike([Tt]weet)?/:id', tweetsController.likeTweet);

// dislike == dislikeTweet
router.post('/[Dd]islike([Tt]weet)?/:id', tweetsController.dislikeTweet);

// fetchAll == getTweets
router.get('/[Ff]etch[Aa]ll', tweetsController.fetchAll);
router.get('/[Gg]et[Tt]weets', tweetsController.fetchAll);

module.exports = router;
