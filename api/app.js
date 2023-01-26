const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const { mongoConnect } = require('./utils/database');
mongoConnect();

const errorController = require('./controllers/error');
const path = require('path');

const indexRouter = require('./routes/index');
const itemsRouter = require('./routes/items');
const testRouter = require('./routes/test');

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// view engine setup for EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', indexRouter);
app.use('/item(s)?', itemsRouter);
app.use('/test', testRouter); // for testing only

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// error handler
app.use(errorController.errorHandler);

module.exports = app;
