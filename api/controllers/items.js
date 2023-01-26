const Document = require('../models/document');
const JSend = require('../utils/jsend');
const attributeValidator = require('../utils/validators/attributeValidator');
const itemValidator = require('../utils/validators/itemValidator');

exports.getItem = (req, res, next) => {
  const uuid = req.params.uuid;
  const uuidError = attributeValidator.uuid(uuid);

  // if valid uuid
  if (!uuidError) {
    // get Item
    Document.getByUUID(uuid)
      .then((item) => {
        if (item) {
          JSend.success(res, { data: item });
        } else {
          JSend.fail(res, {
            code: 404,
            data: ['item: no such uuid: ' + id],
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // if invalid
  else {
    JSend.fail(res, { data: uuidError });
  }
};

exports.addItem = (req, res, next) => {
  const body = req.body;

  const uuid = req.body.uuid ? String(req.body.uuid).trim() : null;
  const name = req.body.name ? String(req.body.name).trim() : null;
  const price = req.body.price ? String(req.body.price).trim() : null;

  let errors = itemValidator.validate({
    uuid,
    name,
    price,
  });

  // if valid params
  if (Object.keys(errors).length === 0) {
    // add Item
    Document.add({
      uuid,
      name,
      price,
    })
      // on success
      .then((item) => {
        JSend.success(res, { code: 201, data: item });
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

exports.deleteItem = async (req, res, next) => {
  try {
    const uuid = req.params.uuid ? String(req.params.uuid).trim() : null;
    let errors = [];
    let item;
    // if valid uuid
    if (!attributeValidator.uuid(uuid)) {
      item = await Document.getByUUID(uuid)
        .then()
        .catch((err) => {
          errors = errors.concat(err.message);
        });
    }

    // if invalid uuid or id
    else {
      errors = errors.concat(['item: invalid uuid: ' + uuid]);
    }

    // if valid uuid
    if (Object.keys(errors).length === 0) {
      // delete Item
      Document.deleteByUUID(uuid)
        // on success
        .then(JSend.success(res, { code: 200, data: item }))
        .catch((err) => {
          next(err);
        });
    } else {
      JSend.fail(res, { data: errors });
    }
  } catch (err) {
    throw Error(err);
  }
};

exports.updateItem = async (req, res, next) => {
  const uuid = req.params.uuid ? String(req.params.uuid).trim() : null;
  const name = req.body.name ? String(req.body.name).trim() : null;
  const price = req.body.price ? String(req.body.price).trim() : null;

  let errors = [];

  // if no key is given, no need to update anything
  if (name == undefined && price == undefined) {
    errors.concat([
      'nothing to update: at least on key:value pair must be given',
    ]);
  }

  // validate uuid
  const uuidError = attributeValidator.uuid(uuid);
  if (uuidError) errors = errors.concat(uuidError);

  // if uuid is valid
  if (Object.keys(errors).length === 0) {
    // get old Item
    const oldItem = await Document.getByUUID(uuid);

    if (oldItem == null) {
      errors = errors.concat(['item: uuid not found: ' + uuid]);
    }

    // if no errors
    if (Object.keys(errors).length === 0) {
      const newItem = new Item({
        uuid: oldDocument.uuid,
        name: name ? name : oldDocument.name,
        price: price ? price : oldDocument.price,
      });

      // validate new Item
      const newItemErrors = itemValidator.validate(newItem);
      if (newItemErrors) errors = errors.concat(newItemErrors);

      // if no new Item errors
      if (Object.keys(errors).length === 0) {
        // check if Item already exist
        const existingItem = await Document.getItem(newItem);

        // if no existing Item
        if (!existingItem) {
          // add Item
          newItem
            .add()
            .then((item) => {
              JSend.success(res, { code: 201, data: item });
            })
            .catch((err) => {
              next(err);
            });
        } else {
          // send existing Item
          JSend.success(res, { code: 200, data: existingItem });
        }
      }
    }
  }

  // if any errors
  if (Object.keys(errors).length !== 0) {
    JSend.fail(res, { data: errors });
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
