const { getDB } = require('../utils/database');
const mongodb = require('mongodb');
const UUID = require('uuid');

/**
 * convert _id to a mongodb.ObjectId()
 * @props _id
 */
const convertToMongoObjectID = (_id) => {
  // convert _id in mongodb.ObjectId()
  if (typeof _id === 'string' || _id instanceof String) {
    return mongodb.ObjectId(_id);
  } else {
    return _id;
  }
};

/**
 * class Document
 * @props collection, document
 * @constructor({ collection, document })
 *
 * @methods
 *  - save () -> save = add OR update
 *  - delete ()
 *
 * @static_methods
 *  - save ({ collection, document }) -> save = add OR update
 *  - findOne ({ collection, key, value })
 *  - deleteOne ({ collection, key, value })
 *  - fetchAll ( collection )
 */

module.exports = class Document {
  constructor({ collection, document }) {
    this.collection = collection;
    this.document = document;
  }

  async save() {
    try {
      const db = getDB();
      // if _id is present, then update
      if (this.document._id) {
        this.document._id = convertToMongoObjectID(this.document._id);

        // update
        const updatedDocument = await db
          .collection(this.collection)
          .findOneAndUpdate(
            { _id: new mongodb.ObjectId(this.document._id) },
            { $set: this.document },
            { returnDocument: 'after' } // returnDocument: 'before' / 'after' update
          );
        this.document = updatedDocument.value;
      }

      // else: add
      else {
        const result = await db
          .collection(this.collection)
          .insertOne(this.document);
        // add newly created insertedId to Document
        this.document._id = mongodb.ObjectId(result.insertedId);
      }
      return this;
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    try {
      this.document._id = convertToMongoObjectID(this.document._id);

      const db = getDB();
      await db
        .collection(this.collection)
        .deleteOne({ _id: this.document._id });
      return this;
    } catch (err) {
      throw err;
    }
  }

  static async save({ collection, document }) {
    try {
      const db = getDB();

      // if _id is present, then update
      if (document._id) {
        document._id = convertToMongoObjectID(document._id);

        path = db.collection('tweets');
        path = db.collection('tweets').document('id').collection('kommentare');

        const updatedDocument = await path.findOneAndUpdate(
          { _id: document._id },
          { $set: document },
          { returnDocument: 'after' } // returnDocument: 'before' / 'after' update
        );
        document = updatedDocument.value;
      }

      // else: add
      else {
        const result = await db.collection(collection).insertOne(document);
        console.log('🚀 - save - result', result);
        // add newly created insertedId to Document
        document._id = mongodb.ObjectId(result.insertedId);
      }
      return new Document({ collection, document });
    } catch (err) {
      throw err;
    }
  }

  static async findRetweet({ collection, key, value }) {
    try {
      if (String(key).includes('_id')) value = convertToMongoObjectID(value);
      const db = getDB();
      const document = await db
        .collection(collection)
        .findOne({ ['retweets.' + key]: value });
      if (document) {
        return new Document({ collection, document: document['retweets'] });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async findOne({ collection, key, value }) {
    try {
      if (key === '_id') value = convertToMongoObjectID(value);

      const db = getDB();
      const document = await db
        .collection(collection)
        .findOne({ [key]: value });
      if (document) {
        return new Document({ collection, document });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async deleteOne({ collection, key, value }) {
    try {
      if (key === '_id') value = convertToMongoObjectID(value);

      const db = getDB();
      const document = await Document.findOne({ collection, key, value });
      if (document) {
        await db.collection(collection).deleteOne({ [key]: value });
        return new Document({ collection, document: document.document });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll(collection) {
    try {
      const db = getDB();
      const documents = await db.collection(collection).find().toArray();
      return documents;
    } catch (err) {
      throw err;
    }
  }
};
