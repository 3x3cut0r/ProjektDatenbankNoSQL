const mongodb = require('mongodb');
const Document = require('../models/document');
const JSend = require('../utils/jsend');

exports.getTest = async (req, res, next) => {
  JSend.success(res, { code: 200 /*  data: allItems */ });
};

exports.postTest = (req, res, next) => {
  JSend.success(res, { code: 200, data: 'test: post' });
};
