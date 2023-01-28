const validator = require('validator');

/**
 * attributeValidator
 * checks if the given attribute of an entry is valid
 *
 * @returns {int} 0 for success
 * @returns {array} Array of Strings with the error messages
 *
 * @methods
 *  - _id ( _id )
 *  - title ( title )
 *  - text ( text )
 */
module.exports = class attributeValidator {
  /**
   * validates if `_id` is an valid _id
   */
  static _id(_id) {
    try {
      if (_id == undefined) {
        return ['_id: key not found'];
      } else {
        _id = String(_id);
      }
    } catch (e) {
      throw Error(e);
    }
    if (!validator.isAlphanumeric(_id, 'de-DE')) {
      return ['_id must be alphanumeric (a-zA-Z0-9): ' + _id];
    }
    return 0;
  }

  /**
   * validates if `title` is an alphanumeric title with valid characters (a-zA-Z0-9)
   */
  static title(title) {
    try {
      if (title == undefined) {
        return ['title: key not found'];
      } else {
        title = String(title);
      }
      return validator.isAlphanumeric(title, 'de-DE', {
        ignore: '+-_.:,;&%*()[]{}#!? ',
      })
        ? 0
        : [
            'title must be alphanumeric (a-zA-Z0-9+-_.:,;&%*()[]{}#!? ): ' +
              title,
          ];
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * validates if `text` is a currency
   */
  static text(text) {
    try {
      if (text == undefined) {
        return ['text: key not found'];
      } else {
        text = String(text);
      }
      return validator.isAlphanumeric(text, 'de-DE', {
        ignore: '+-_.:,;&%*()[]{}\'"#!? ',
      })
        ? 0
        : [
            'text must be alphanumeric (a-zA-Z0-9+-_.:,;&%*()[]{}\'"#!? ): ' +
              text,
          ];
    } catch (e) {
      throw Error(e);
    }
  }
};
