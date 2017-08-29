/*******************************************
* DEPENDENCIES
*******************************************/

var express = require('express');
var request = require('request');
var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;
var router = express.Router();

/*******************************************
* FUNCTIONS
*******************************************/

function cleanString(str) {
  var tmp = str;
  tmp = tmp.replace(/\s{2,}/g, ' ');
  tmp = tmp.replace(/\t/g, ' ');
  tmp = tmp.toString().trim().replace(/(\r\n|\n|\r)/g, '');
  return tmp;
}

/*******************************************
* ROUTES
*******************************************/

router.get('/', function(req, res, next) {
  // Sanitize query params
  req.sanitizeQuery('url').trim();
  req.sanitizeQuery('xpath').trim();
  // Check query params
  if(req.query.url == undefined || req.query.xpath == undefined) {
    next('Bad parameters, url or xpath missing');
  } else {
    // Get html at the url specified
    request(req.query.url, function (error, response, body) {
      // Error handler
      if (error) {
        next(error);
      } else {
        // Parser
        try {
          var document = parse5.parse(cleanString(body).toString());
          var xhtml = xmlser.serializeToString(document);
          var doc = new dom().parseFromString(xhtml);
          var select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
          var nodes = select(req.query.xpath, doc);
          // Response
          res.json({
            error: false,
            status: response.statusCode,
            body: nodes[0] ? nodes[0].toString().replace('xmlns=\"http://www.w3.org/1999/xhtml\"','') : ''
          });
        } catch(exception) {
          next('Unexpected error thrown');
        }
      }
    });
  }
});

/*******************************************
* EXPORT
*******************************************/

module.exports = router;
