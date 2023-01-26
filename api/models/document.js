const { getDB } = require('../utils/database');
const UUID = require('uuid');

/**
 * class Document
 * @props collection, document
 * @constructor({ collection, document })
 *
 * @methods
 *  - add ()
 *  - delete ()
 *  - update ()
 *
 * @static_methods
 *  - add ({ collection, document })
 *  - getByUUID ({ collection, uuid })
 *  - fetchAll ( collection )
 */

module.exports = class Item {
  constructor({ collection, document }) {
    this.collection = collection;
    this.document = document;
  }

  async add() {
    try {
      const db = getDB();
      const result = await db
        .collection(this.collection)
        .insertOne(this.document);
      return this.document;
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    try {
      const db = getDB();
      const result = await db
        .collection(this.collection)
        .insertOne(this.document);
      return this;
    } catch (err) {
      throw err;
    }
  }

  static async add({ collection, document }) {
    try {
      const db = getDB();
      const result = await db.collection(collection).insertOne(document);
      return document;
    } catch (err) {
      throw err;
    }
  }

  static async getByID({ collection, id }) {
    try {
      const db = getDB();
      const result = await db.collection(collection).find({ _id: id }).next();
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getByUUID({ collection, uuid }) {
    try {
      const db = getDB();
      const result = await db
        .collection(collection)
        .find({ uuid: uuid })
        .next();
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll(collection) {
    try {
      const db = getDB();
      const results = await db.collection(collection).find().toArray();
      return results;
    } catch (err) {
      throw err;
    }
  }
};
