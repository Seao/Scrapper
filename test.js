process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();

chai.use(chaiHttp);

describe('GET /', () => {
  it('it should response with status 200', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
