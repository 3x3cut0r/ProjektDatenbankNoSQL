const httpStatusCodes = require('http-status-codes');
const validator = require('validator');

// valid http 1xx error codes
const valid1xxCodes = [100, 101, 102, 103];

// valid http 2xx error codes
const valid2xxCodes = [200, 201, 202, 203, 204, 205, 206];

// valid http 3xx error codes
const valid3xxCodes = [300, 301, 302, 303, 304, 305, 306, 307, 308];

// valid http 4xx error codes
const valid4xxCodes = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
];

// valid http 5xx error codes
const valid5xxCodes = [
  500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511,
];

/**
 * class for a JSON response based on JSend specification:
 *  https://github.com/omniti-labs/jsend
 *
 * @types success, fail, error
 *
 * @keys status, code, message, data
 */
module.exports = class JSend {
  /**
   * success: All went well, and (usually) some data was returned.
   * @param {*} status always `success`
   * @param {*} code optional, default = `200`
   * @param {*} message optional, default = http status code (`OK`)
   * @param {*} data optional
   * @returns JSON object { status, code, message?, data? }
   */
  static success(res, { code, message, data }) {
    let obj = { status: 'success' };

    // code
    code == undefined ||
    !validator.isInt(String(code)) ||
    !valid2xxCodes.includes(code)
      ? (obj.code = 200)
      : (obj.code = code);

    // message
    if (message) {
      obj.message = message;
    } else {
      obj.message = httpStatusCodes.getReasonPhrase(obj.code);
    }

    // data
    if (data) obj.data = data;

    // render
    res.status(obj.code).json(obj);
  }

  /**
   * fail: There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
   * @param {*} status always `fail`
   * @param {*} code optional, default = `400`
   * @param {*} message optional, default = http status code (`Bad Request`)
   * @param {*} data optional
   * @returns JSON object { status, code, message?, data? }
   */
  static fail(res, { code, message, data }) {
    let obj = { status: 'fail' };

    // code
    if (code == undefined || !validator.isInt(String(code))) {
      obj.code = 400;
    } else if (String(code).startsWith('5')) {
      obj.code = valid5xxCodes.includes(code) ? code : 500;
    } else {
      obj.code = valid4xxCodes.includes(code) ? code : 400;
    }

    // message
    if (message) {
      obj.message = message;
    } else {
      obj.message = httpStatusCodes.getReasonPhrase(obj.code);
    }

    // data
    if (data) obj.data = data;

    // render
    res.status(obj.code).json(obj);
  }

  /**
   * error: An error occurred in processing the request, i.e. an exception was thrown
   * @param {*} status always `error`
   * @param {*} code optional, default = `500`
   * @param {*} message optional, default = http status code (`Internal Server Error`)
   * @param {*} data optional
   * @returns JSON object { status, message, code?, data? }
   */
  static error(res, { code, message, data }) {
    let obj = { status: 'error' };

    // code
    if (code == undefined || !validator.isInt(String(code))) {
      obj.code = 500;
    } else if (String(code).startsWith('4')) {
      obj.code = valid4xxCodes.includes(code) ? code : 400;
    } else {
      obj.code = valid5xxCodes.includes(code) ? code : 500;
    }

    // message
    if (message) {
      obj.message = message;
    } else {
      obj.message = httpStatusCodes.getReasonPhrase(obj.code);
    }

    // data
    if (data) obj.data = data;

    // render
    res.status(obj.code).json(obj);
  }
};
