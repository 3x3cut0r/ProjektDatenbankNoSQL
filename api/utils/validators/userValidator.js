const attributeValidator = require('./attributeValidator');

module.exports = class userValidator {
  static validate({ username }, errors = []) {
    // validate username
    const usernameError = attributeValidator.username(username);
    if (usernameError) errors = errors.concat(usernameError);

    return errors;
  }
};
