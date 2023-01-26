const attributeValidator = require('./attributeValidator');

module.exports = class addressValidator {
  static validate({ uuid, name, price }, errors = []) {
    // validate uuid
    const uuidError = attributeValidator.uuid(uuid);
    if (uuidError) errors = errors.concat(uuidError);

    //validate name
    const nameError = attributeValidator.name(name);
    if (nameError) errors = errors.concat(nameError);

    //valitade price
    const priceError = attributeValidator.price(price);
    if (priceError) errors = errors.concat(priceError);

    return errors;
  }
};
