const attributeValidator = require('./attributeValidator');

module.exports = class addressValidator {
  static validate({ title, text }, errors = []) {
    // validate title
    const titleError = attributeValidator.title(title);
    if (titleError) errors = errors.concat(titleError);

    // valitade text
    const textError = attributeValidator.text(text);
    if (textError) errors = errors.concat(textError);

    return errors;
  }
};
