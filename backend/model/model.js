const { pool } = require('../db_con')
const bcrypt = require('bcrypt')
const passport = require('passport')

const saltRounds = 10;
const getAdmin = (request, response) => {
  pool.query('SELECT * FROM Admin', (error, results) => {
    if (error) {
      response.status(400).json({
          error:error
      });
    }
    console.log(request.user)
    console.log(request.isAuthenticated())

    response.status(200).json(results.rows)
  })
}


const addAdmin = (request, response) => {
  const { email, password } = request.body

  bcrypt.hash(password, saltRounds, function(err, hash) {
  pool.query('INSERT INTO Admin (email, password) VALUES ($1, $2)', [email, hash], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }
    pool.query("select currval(pg_get_serial_sequence('admin','id')) as user_id",function(error,results,fields){

      if(error) throw error;

      const user_id = results.rows[0].user_id
      request.login(user_id, function(err){
      response.status(201).json({ status: 'success', message: 'Admin added.' })
      })

    })

  })

});
}



const login = (request, response) => {
   const { username, password } = request.body
   response.json(username,password)

}

passport.serializeUser(function(user_id,done){
  done(null, user_id)
})

passport.deserializeUser(function(user_id,done){
  done(null, user_id)
})

module.exports = {
    getAdmin,
    addAdmin,
    login,
}
