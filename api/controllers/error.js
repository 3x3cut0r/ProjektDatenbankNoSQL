const JSend = require('../utils/jsend');
const validator = require('validator');

exports.errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // replace "Error: Error:" messages
  if (String(err.message).search('Error: ') >= 0) {
    data = String(err.message).replaceAll('Error: ', '');
  }

  // catch database errors
  if (String(err.message).search('Duplicate') >= 0) {
    code = 400;

    // remove sensitive data: ip address
    let re = new RegExp('(?:[0-9]{1,3}.){3}[0-9]{1,3}', 'i');
    data = String(err.message).replace(re, '');
    // remove sensitive data: :port
    re = new RegExp(
      '((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))',
      'i'
    );
    data = String(err.message).replace(re, '');
  }

  // catch sql connection errors
  if (err.hasOwnProperty('sql') || err.hasOwnProperty('errno')) {
    let dbMessage;
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      dbMessage = 'Database connection was closed.';
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      dbMessage = 'Database has too many connections.';
    } else if (err.code === 'ECONNREFUSED') {
      dbMessage = 'Database connection was refused.';
    } else {
      // prevent to send sensitive data, e.g.: ip address
      dbMessage = null;
    }

    // send JSON response based on JSend specification
    res.status(503).json({
      status: 'database error',
      code: err.errno,
      message: err.code,
      data: dbMessage,
    });
  }

  // send JSend.error
  else {
    JSend.error(res, {
      code: err.status,
      // message: is generated from code
      data: err.message,
    });
  }
};
