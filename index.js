/*******************************************
* DEPENDENCIES
*******************************************/

var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/*******************************************
* APP SETTINGS
*******************************************/

var app = express();

app.set('port', (process.env.PORT || 5000));

/*******************************************
* USAGES
*******************************************/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

/*******************************************
* ROUTES
*******************************************/

app.use('/', require('./routes'));

app.use(function(err, req, res, next) {
  res.status(500).json({ 'error': err });
});

/*******************************************
* START
*******************************************/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});

module.exports = app;
