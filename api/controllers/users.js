const Document = require('../models/document');
const JSend = require('../utils/jsend');
const attributeValidator = require('../utils/validators/attributeValidator');
const userValidator = require('../utils/validators/userValidator');

exports.findUser = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // get user
    Document.findOne({ collection: 'users', key: '_id', value: _id })
      .then((document) => {
        if (document) {
          JSend.success(res, { data: document });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['user: no such _id: ' + _id],
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

exports.saveUser = (req, res, next) => {
  const body = req.body;
  const _id = req.body._id ? String(req.body._id).trim() : null;
  let errors = [];

  // required parameters
  const username = req.body.username ? String(req.body.username).trim() : null;

  const usernameError = attributeValidator.username(username);
  if (usernameError) errors = errors.concat(usernameError);

  if (_id) {
    const _idError = attributeValidator._id(_id);
    if (_idError) errors = errors.concat(_idError);
  }

  // if valid params
  if (Object.keys(errors).length === 0) {
    // save user
    Document.save({ collection: 'users', document: body })
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

exports.deleteUser = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // delete user
    Document.deleteOne({ collection: 'users', key: '_id', value: _id })
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

exports.fetchAll = (req, res, next) => {
  // get all users from database
  Document.fetchAll('users')
    .then((users) => {
      JSend.success(res, { data: users });
    })
    .catch((err) => {
      next(err);
    });
};
