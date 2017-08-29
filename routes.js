/*******************************************
* DEPENDENCIES
*******************************************/

var express = require('express');
var router = express.Router();

/*******************************************
* ROUTES
*******************************************/

router.get('/', function(req, res, next) {
  res.json({
    users: [
      {
        name: 'John'
      }
    ]
  });
});

/*******************************************
* EXPORT
*******************************************/

module.exports = router;
