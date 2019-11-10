const request = require('supertest');
const app = require('../../app.js');
const expect = require('chai').expect


describe('POST /api/v1/auth/create-admin', function() {
    it('Should register an admin user', function(done) {

        request(app).post('/api/v1/auth/create-admin')
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


describe('POST /api/v1/auth/admin/signin', function() {

   it('Should login an admin user', function(done) {

        request(app).post('/api/v1/auth/admin/signin')
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
    request(app).post('/api/v1/auth/admin/signin')
      .send({username:'trial@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token
        done();
      });

  });

    it('Should be able to get admin user', function(done) {
     request(app).get('/api/v1/getadmin')
      .set('Authorization', 'Bearer ' +  token)
      .expect(200)
       .expect('Content-Type', /json/)
        .end(function(error, response){
            if(error) return done(error);
            done();
        });

    });

});




describe('POST /api/v1/auth/create-user', function() {
        var token;

  before(function(done) {
    request(app).post('/api/v1/auth/admin/signin')
      .send({username:'trial@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token
        done();
      });

  });

    it('Should be able to register an employee', function(done) {


        request(app).post('/api/v1/auth/create-user')
        .set('Authorization', 'Bearer ' +  token)
        .set('Accept', 'application/json')
        .send({
            firstName:'BrianT',
            lastName:'Mugenya',
            email:'employee1@email.com',
            password:'12345',
            gender:'Male',
            jobRole:'Security',
            department:'IT',
            address:'kenya'
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
        token = response.body.token
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
            done();
        });

    });

});









// describe('POST /api/v1/gifs', function() {
//   var token;

//   before(function(done) {
//     request(app).post('/api/v1/auth/signin')
//       .send({username:'employee1@email.com', password:'12345' })
//       .end(function(error, response) {
//         if(error) return done(error);
//         token = response.body.token
//         done();
//       });

//   });



//     it('Should be able to create an gif', function(done) {


//         request(app).post('/api/v1/gifs')
//         .set('Authorization', 'Bearer ' +  token)
//         .set('Accept', 'multipart/form-data')


//         .send({
//                 image:"/home/mugz/Pictures/kapow.png",
//                 title:"Nindo way",
//                 employee_id:13
//             })

//         .expect('Content-Type', /form-data/)
//         .expect(201)

//         .end(function(error, response){
//             if(error) return done(error);

//             done();
//         });

//     });

// });




describe('PATCH /api/v1/articles/:id', function() {
  var token;

  before(function(done) {
    request(app).post('/api/v1/auth/signin')
      .send({username:'employee1@email.com', password:'12345' })
      .end(function(error, response) {
        if(error) return done(error);
        token = response.body.token
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
        token = response.body.token
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


