const Document = require('../models/document');
const validator = require('validator');
const attributeValidator = require('../utils/validators/attributeValidator');
const JSend = require('../utils/jsend');
const Fs = require('fs');
const path = require('path');
const rootDir = require('../utils/rootDir');

exports.getTest = async (req, res, next) => {
  /* const newItem = new Item({ name: 'Handbag', price: '34,95' });
  newItem.add(); */

  // const allItems = await Document.fetchAll('items');

  const singleItem = await Document.getByUUID({
    collection: 'items',
    uuid: '28105d81-dac5-48a4-b70d-a40b2882a719',
  });

  JSend.success(res, { code: 200, data: singleItem });
};

exports.postTest = (req, res, next) => {
  JSend.success(res, { code: 200, data: 'test: post' });
};
