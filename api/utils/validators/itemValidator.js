const attributeValidator = require('./attributeValidator');

module.exports = class addressValidator {
  static validate({ name, price }, errors = []) {
    // validate name
    const nameError = attributeValidator.name(name);
    if (nameError) errors = errors.concat(nameError);

    // valitade price
    const priceError = attributeValidator.price(price);
    if (priceError) errors = errors.concat(priceError);

    return errors;
  }
};
