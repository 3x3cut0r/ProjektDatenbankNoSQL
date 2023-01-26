const attributeValidator = require('./attributeValidator');

module.exports = class userValidator {
  static validate({ email, firstname, lastname }, errors = []) {
    // validate email
    const emailError = attributeValidator.email(email);
    if (emailError) errors = errors.concat(emailError);

    // validate firstname
    const firstnameError = attributeValidator.firstname(firstname);
    if (firstnameError) errors = errors.concat(firstnameError);

    // validate lastname
    const lastnameError = attributeValidator.lastname(lastname);
    if (lastnameError) errors = errors.concat(lastnameError);

    return errors;
  }

  static validatePassword(password, errors = []) {
    // validate password
    const passwordErrors = attributeValidator.password(password);
    if (passwordErrors) errors = errors.concat(passwordErrors);

    return errors;
  }

  static validateOnUpdate(
    { id, uuid, email, firstname, lastname },
    errors = []
  ) {
    // validate id
    const idError = attributeValidator.id(id);
    if (idError) errors = errors.concat(idError);

    // validate uuid
    const uuidError = attributeValidator.uuid(uuid);
    if (uuidError) errors = errors.concat(uuidError);

    const validateErrors = this.validate(
      {
        email,
        firstname,
        lastname,
      },
      errors
    );

    if (validateErrors) errors = errors.concat(validateErrors);

    return errors;
  }
};
