const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')


const pg = require('pg')
const pgSession = require('connect-pg-simple')(session);

const LocalStartegy = require('passport-local').Strategy

const app = express()
const model = require('./model/model')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var pgPool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Teamwork',
  password: 'Boywonder47',
  port: 5432,
});








sessionStore = new pgSession({
    pool : pgPool               // Connection pool

  })



app.use(cookieParser());
app.use(session({
    store: sessionStore,
    secret: 'thisandThat',
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }

}));

passport.use(new LocalStartegy(
  function(username,password,done){
    console.log(username);
     console.log(password);
     const { pool } = require('./db_con')

    pool.query('select id, password from admin where email = $1',[username], function(error,results,fields) {
    if(error) {done(error)}

    if(results.rows.length === 0){
      return done(null, false);
    }
     const hash = results.rows[0].password.toString()

     bcrypt.compare(password, hash, function(error,response){
       if(response === true){

         return done(null, {user_id: results.rows[0].id});
       }else{

         return done(null,false)
       }
  })
  });
  }))




app.use(passport.initialize())
app.use(passport.session())


app.get('/admin/getadmin',model.getAdmin)
app.post('/admin/addadmin', model.addAdmin)
app.post('/admin/login', passport.authenticate('local'), model.login)





module.exports = app;
