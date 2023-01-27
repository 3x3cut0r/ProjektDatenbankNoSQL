const Document = require('../models/document');
const JSend = require('../utils/jsend');
const attributeValidator = require('../utils/validators/attributeValidator');
const itemValidator = require('../utils/validators/itemValidator');

exports.getItem = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (!idError) {
    // get Item
    Document.getByID(_id)
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
  const update = req.body._id ? true : false;
  const uuid = req.body.uuid ? String(req.body.uuid).trim() : null;
  const name = req.body.name ? String(req.body.name).trim() : null;
  const price = req.body.price ? String(req.body.price).trim() : null;

  let errors = itemValidator.validate({
    uuid,
    name,
    price,
  });

  // if valid params
  if (!errors) {
    // save Item
    Document.save({ collection: 'items', document: body })
      .then((document) => {
        document.status = update ? 'updated' : 'added';
        JSend.success(res, { data: document });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.deleteItem = (req, res, next) => {
  const _id = req.params.id ? String(req.params.id).trim() : null;
  const idError = attributeValidator._id(_id);

  // if valid _id
  if (!idError) {
    // get Item
    Document.deleteByID(_id)
      .then((document) => {
        if (document) {
          document.status = 'deleted';
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
