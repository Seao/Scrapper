/*******************************************
* DEPENDENCIES
*******************************************/

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*******************************************
* APP SETTINGS
*******************************************/

var app = express();

app.set('port', (process.env.PORT || 5000));

/*******************************************
* USAGES
*******************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

/*******************************************
* ROUTES
*******************************************/

app.use('/', require('./routes'));

/*******************************************
* START
*******************************************/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});
