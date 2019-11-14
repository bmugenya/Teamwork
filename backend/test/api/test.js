const request = require('supertest');
const app = require('../../app.js');
const expect = require('chai').expect;


describe('POST /api/v1/auth/create-user', function() {
  var token;
  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'admin@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.data.token;
        done();
      });

  });

    it('Should be able to register an employee', function(done) {


        request(app).post('/api/v1/auth/create-user')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({
            adminEmail:"admin@email.com",
            adminPassword:"12345",
            firstName:'BrianT',
            lastName:'Mugenya',
            email:'employee4@email.com',
            password:'12345',
            gender:'Male',
            jobRole:'Security',
            department:'IT',
            address:'kenya',
            is_admin:"False"
        })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('User account successfully created');
            done();
        });

    });

});


describe('POST /api/v1/auth/signin', function() {

   it('Should login an employee user', function(done) {

        request(app).post('/api/v1/auth/signin')
        .send({username:'employee1@email.com', password:'12345' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

        .end(function(error, response){
            if(error) return done(error);
            expect(response.body.status).to.be.equal('success');
            done();
        });

    });

});





describe('POST /api/v1/articles', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to create an article', function(done) {


        request(app).post('/api/v1/articles')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({
                title:"Nindo way",
                article:"My nindo way is to give my best till the very end",
                employee_id:13
            })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Article successfully posted');
               // expect(response.body.data).should.to.have.property('token');
            done();
        });

    });

});


describe('PATCH /api/v1/articles/:id', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to update an article', function(done) {


        request(app).patch('/api/v1/articles/' + 1)
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({
                title:"update update update",
                article:"My nindo way is to give my best till the very end",
                employee_id:12
            })

        .expect('Content-Type', /json/)
        .expect(200)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Article successfully updated');
            done();
        });

    });

});



describe('DELETE /api/v1/articles/:id', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to delete an article', function(done) {


        request(app).delete('/api/v1/articles/' + 7)
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ employee_id:13 })
        .expect('Content-Type', /json/)
        .expect(200)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Article successfully deleted');
            done();
        });

    });

});



describe('DELETE /api/v1/gifs/:id', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to delete gif', function(done) {


        request(app).delete('/api/v1/gifs/' + 7)
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ employee_id:12 })
        .expect('Content-Type', /json/)
        .expect(200)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('gif post successfully deleted');
            done();
        });

    });

});




describe('POST /api/v1/articles/:id/comment', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to comment on an article', function(done) {

        request(app).post('/api/v1/articles/'+ 1 +'/comment')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ comment:"ninja way", employee_id:11 })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Comment successfully created');
            done();
        });

    });

});





describe('POST /api/v1/gifs/:id/comment', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to comment on a gif', function(done) {

        request(app).post('/api/v1/gifs/'+ 2 +'/comment')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ comment:"ninja way", employee_id:11 })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Comment successfully created');
            done();
        });

    });

});


describe('GET /api/v1/feed', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to get all aticles in descending order', function(done) {
     request(app).get('/api/v1/feed')
      .set('Authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});





describe('GET /api/v1/articles/articleId', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to get a specific article', function(done) {
     request(app).get('/api/v1/articles/' + 3)
      .set('Authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});






describe('GET /api/v1/gifs/gifId', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to get a specific gif', function(done) {
     request(app).get('/api/v1/gifs/' + 2)
      .set('Authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});



describe('GET /api/v1/feed/search?category={category}', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Employees can view all articles that belong to a category (tag)', function(done) {
     request(app).get('/api/v1/feed/search')
      .set('Authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});





describe('POST /api/v1/articles/:id/flag', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to report an article', function(done) {

        request(app).post('/api/v1/articles/'+ 1 +'/flag')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ comment:"rude", employee_id:11 })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Article Reported');
            done();
        });

    });

});




describe('POST /api/v1/gifs/:id/flag', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token;
        done();
      });

  });

    it('Should be able to report a gif', function(done) {

        request(app).post('/api/v1/gifs/'+ 1 +'/flag')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({ comment:"ninja way", employee_id:11 })

        .expect('Content-Type', /json/)
        .expect(201)

        .end(function(error, response){
            if(error) return done(error);
               expect(response.body.status).to.be.equal('success');
               expect(response.body.data.message).to.be.equal('Gif Reported');
            done();
        });

    });

});

