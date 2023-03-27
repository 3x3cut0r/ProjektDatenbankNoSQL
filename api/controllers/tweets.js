const Document = require('../models/document');
const JSend = require('../utils/jsend');
const attributeValidator = require('../utils/validators/attributeValidator');
const tweetValidator = require('../utils/validators/tweetValidator');

exports.findTweet = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // get tweet
    Document.findOne({ collection: 'tweets', key: '_id', value: _id })
      .then((document) => {
        if (document) {
          JSend.success(res, { data: document });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['tweet: no such _id: ' + _id],
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid _id
  else {
    JSend.fail(res, { data: idError });
  }
};

exports.saveTweet = (req, res, next) => {
  var body = req.body;

  // set default values:
  const _id = req.body._id ? String(req.body._id).trim() : null; // _id
  const update = _id ? true : false;
  body.timestamp = parseInt(Date.now() / 1000); // create current timestamp
  if (update === false) body.isRetweet = false; // set isRetweet to false on new tweets
  if (Object.values(body).includes('originalTweetID')) body.isRetweet = true; // set isRetweet to true on retweets

  let errors = [];

  // required parameters
  const title = req.body.title ? String(req.body.title).trim() : null;
  const text = req.body.text ? String(req.body.text).trim() : null;

  if (!_id) {
    // check only on add, not on update
    errors = tweetValidator.validate({
      title,
      text,
    });
  }

  if (_id) {
    const _idError = attributeValidator._id(_id);
    if (_idError) errors = errors.concat(_idError);
  }

  // if valid params
  if (Object.keys(errors).length === 0) {
    // save Tweet
    Document.save({ collection: 'tweets', document: body })
      .then((document) => {
        if (document) {
          JSend.success(res, {
            code: _id ? 200 : 201,
            message: _id ? 'updated' : 'created',
            data: document,
          });
        } else {
          JSend.fail(res, { code: 400, data: 'something went wrong' });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid params
  else {
    JSend.fail(res, { data: errors });
  }
};

exports.deleteTweet = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // delete tweet
    Document.deleteOne({ collection: 'tweets', key: '_id', value: _id })
      .then((document) => {
        if (document) {
          JSend.success(res, { message: 'deleted', data: document });
        } else {
          JSend.fail(res, { code: 404, data: 'no such _id: ' + _id });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid _id
  else {
    JSend.fail(res, { data: idError });
  }
};

exports.likeTweet = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // get tweet
    Document.findOne({ collection: 'tweets', key: '_id', value: _id })
      .then((document) => {
        // update likes
        if (document) {
          let likes = document.document.likes;
          if (likes >= 0) {
            document.document.likes = ++likes;
          } else {
            document.document.likes = 1;
          }
          document.save();
          JSend.success(res, { data: document });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['tweet: no such _id: ' + _id],
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid _id
  else {
    JSend.fail(res, { data: idError });
  }
};

exports.dislikeTweet = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // get Tweet
    Document.findOne({ collection: 'tweets', key: '_id', value: _id })
      .then((document) => {
        // update dislikes
        if (document) {
          let dislikes = document.document.dislikes;
          if (dislikes >= 0) {
            document.document.dislikes = ++dislikes;
          } else {
            document.document.dislikes = 1;
          }
          document.save();
          JSend.success(res, { data: document });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['tweet: no such _id: ' + _id],
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid _id
  else {
    JSend.fail(res, { data: idError });
  }
};

exports.fetchAll = (req, res, next) => {
  // get all tweets from database
  Document.fetchAll('tweets')
    .then((tweets) => {
      JSend.success(res, { data: tweets });
    })
    .catch((err) => {
      next(err);
    });
};
