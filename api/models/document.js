const { getDB } = require('../utils/database');
const mongodb = require('mongodb');
const UUID = require('uuid');

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
 *  - get ({ collection, key, value })
 *  - getByID ({ collection, id })
 *  - delete ({ collection, key, value })
 *  - deleteByID ({ collection, id })
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
        // update
        await db
          .collection(this.collection)
          .findOneAndUpdate(
            { _id: new mongodb.ObjectId(this.document._id) },
            { $set: this.document }
          );
      }

      // else: add
      else {
        const result = await db
          .collection(this.collection)
          .insertOne(this.document);
        // add newly created insertedId to Document
        this.document._id = result.insertedId;
      }
      return this;
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    try {
      const db = getDB();
      await db
        .collection(this.collection)
        .deleteOne({ _id: new mongodb.ObjectId(this.document._id) });
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
        await db
          .collection(collection)
          .findOneAndUpdate(
            { _id: new mongodb.ObjectId(document._id) },
            { $set: document }
          );
      }

      // else: add
      else {
        const result = await db.collection(collection).insertOne(document);
        // add newly created insertedId to Document
        document._id = result.insertedId;
      }
      return new Document({ collection, document });
    } catch (err) {
      throw err;
    }
  }

  static async get({ collection, key, value }) {
    try {
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

  static async getByID({ collection, _id }) {
    try {
      const document = await Document.get({
        collection,
        key: '_id',
        value: _id,
      });
      if (document) {
        return new Document({ collection, document: document.document });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async delete({ collection, key, value }) {
    try {
      const db = getDB();
      const document = Document.get({ collection, key, value });
      if (document) {
        await db.collection(collection).deleteOne({ [key]: value });
        return new Document({ collection, document: document.document });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  static async deleteByID({ collection, _id }) {
    try {
      const document = await Document.getByID({ collection, _id });
      if (document) {
        await Document.delete({
          collection,
          key: '_id',
          value: _id,
        });
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
