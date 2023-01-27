const mongodb = require('mongodb');
const Document = require('../models/document');
const JSend = require('../utils/jsend');

exports.getTest = async (req, res, next) => {
  // add
  let newDocument = await Document.save({
    collection: 'items',
    document: { name: 'Handbag', price: '34,95' },
  });
  console.log('🚀 - exports.getTest= - newDocument', newDocument);

  // update
  newDocument.document.price = '39,99';
  const updatedDocument = await newDocument.save();
  console.log('🚀 - exports.getTest= - updatedDocument', updatedDocument);

  // get
  const singleDocument = await Document.get({
    collection: 'items',
    key: 'price',
    value: '39,99',
  });
  console.log('🚀 - exports.getTest= - singleDocument', singleDocument);

  // getbyID
  const singleDocumentByID = await Document.getByID({
    collection: 'items',
    _id: '63d3a8b814c49e703d25fb4f',
  });
  console.log('🚀 - exports.getTest= - singleDocumentByID', singleDocumentByID);

  // delete
  const deletedDocument = await newDocument.delete();
  console.log('🚀 - exports.getTest= - deletedDocument', deletedDocument);

  // fetchAll
  const allItems = await Document.fetchAll('items');

  JSend.success(res, { code: 200 /*  data: allItems */ });
};

exports.postTest = (req, res, next) => {
  JSend.success(res, { code: 200, data: 'test: post' });
};
