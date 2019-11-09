const request = require('supertest');
const app = require('../../app.js');
const expect = require('chai').expect


describe('POST /api/v1/auth/signin', function() {
    it('Should register an admin user', function(done) {

        request(app).post('/api/v1/auth/signin')
        .send({email:'test@email.com', password:'test' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
              expect(response.body.status).to.be.equal('success');
              expect(response.body.message).to.be.equal('Admin added.');
            done();
        });

    });

});





describe('POST /api/v1/login', function() {

   it('Should login an admin user', function(done) {

        request(app).post('/api/v1/login')
        .send({username:'test@email.com', password:'test' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});


describe('GET /api/v1/getadmin', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/login')
      .send({username:'test@email.com', password:'test' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token
        done();
      });

  });

    it('Should be able to get admin user', function(done) {
     request(app).get('/api/v1/getadmin')
      .set('authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});
