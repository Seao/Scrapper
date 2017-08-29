/*******************************************
* DEPENDENCIES
*******************************************/

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./index');
var should = chai.should();

/*******************************************
* USAGE
*******************************************/

chai.use(chaiHttp);

/*******************************************
* TESTS
*******************************************/

describe('GET /', () => {
  it('missing url, it should response with status 500', (done) => {
    chai.request(server).get('/?xpath=//x:div').end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });
  it('missing url, it should response with status 500', (done) => {
    chai.request(server).get('/?url=http://www.google.fr').end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });
  it('valid parameters, it should response with status 200', (done) => {
    chai.request(server).get('/?url=http://www.google.fr&xpath=//x:div').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
