const validator = require('validator');

/**
 * attributeValidator
 * checks if the given attribute of an entry is valid
 *
 * @returns {int} 0 for success
 * @returns {array} Array of Strings with the error messages
 *
 * @methods
 *  - uuid ( uuid )
 *  - name ( name )
 *  - price ( price )
 */
module.exports = class attributeValidator {
  /**
   * validates if `uuid` is an valid UUID (all versions)
   */
  static uuid(uuid) {
    try {
      if (uuid == undefined) {
        return ['uuid: key not found'];
      } else {
        uuid = String(uuid);
      }
    } catch (e) {
      throw Error(e);
    }
    if (!validator.isUUID(uuid)) {
      return ['uuid is not a valid UUID: ' + uuid];
    }
    return 0;
  }

  /**
   * validates if `name` is an alphanumeric name with valid characters (a-zA-Z0-9)
   */
  static name(name) {
    try {
      if (name == undefined) {
        return ['name: key not found'];
      } else {
        name = String(name);
      }
      return validator.isAlphanumeric(name, 'de-DE', { ignore: '-_. ' })
        ? 0
        : ['name must be alphanumeric (a-zA-Z0-9-_. ): ' + name];
    } catch (e) {
      throw Error(e);
    }
  }

  /**
   * validates if `price` is a currency
   */
  static price(price) {
    try {
      if (price == undefined) {
        return ['price: key not found'];
      } else {
        price = String(price);
      }
      return validator.isCurrency(price, 'de-DE', {
        symbol: '€',
        require_symbol: false,
        allow_space_after_symbol: false,
        allow_negatives: false,
        negative_sign_before_digits: false,
        negative_sign_after_digits: false,
        thousands_separator: '.',
        decimal_separator: ',',
        digits_after_decimal: [2],
      })
        ? 0
        : ['price format invalid: "1.000,00 €": ' + price];
    } catch (e) {
      throw Error(e);
    }
  }
};
