const Document = require('../models/document');
const JSend = require('../utils/jsend');
const attributeValidator = require('../utils/validators/attributeValidator');
const itemValidator = require('../utils/validators/itemValidator');

exports.getItem = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // get Item
    Document.getByID({ collection: 'items', _id })
      .then((document) => {
        if (document) {
          JSend.success(res, { data: document });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['item: no such _id: ' + _id],
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

exports.saveItem = (req, res, next) => {
  const body = req.body;
  const _id = req.body._id ? String(req.body._id).trim() : null;

  // required parameters
  const name = req.body.name ? String(req.body.name).trim() : null;
  const price = req.body.price ? String(req.body.price).trim() : null;

  let errors = itemValidator.validate({
    name,
    price,
  });

  if (_id) {
    const _idError = attributeValidator._id(_id);
    if (_idError) errors = errors.concat(_idError);
  }

  // if valid params
  if (Object.keys(errors).length === 0) {
    // save Item
    Document.save({ collection: 'items', document: body })
      .then((document) => {
        if (document) {
          document.status = _id ? 'updated' : 'added';
          JSend.success(res, { data: document });
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

exports.deleteItem = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (Object.keys(idError).length === 0) {
    // delete Item
    Document.deleteByID({ collection: 'items', _id })
      .then((document) => {
        if (document) {
          document.status = 'deleted';
          JSend.success(res, { data: document });
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
  // get all items from database
  Document.fetchAll('items')
    .then((items) => {
      JSend.success(res, { data: items });
    })
    .catch((err) => {
      next(err);
    });
};
