const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let dbo;

const mongoConnect = () => {
  MongoClient.connect(
    'mongodb://project:project@mongo:27017/project?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then((client) => {
      dbo = client.db();
    })
    .catch((err) => {
      throw err;
    });
};

const getDB = () => {
  if (dbo) {
    return dbo;
  }
  throw 'No database found!';
};

module.exports = { mongoConnect, getDB };
