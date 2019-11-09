 const { pool } = require('../db_con')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const saltRounds = 10;
const getAdmin = (request, response) => {
  pool.query('SELECT * FROM Admin', (error, results) => {
    if (error) {
      response.status(400).json({
          error:error
      });
    }

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
   response.status(201).json({ status: 'success', message: 'Admin added.' })

    })

  })
}



const login = (request, res, next) => {
    const { username, password } = request.body
   pool.query('select id, password from admin where email = $1',[username],function(error,results,fields) {


    if(results.rows.length === 0){
      console.log('invalid')
    } else{
     const hash = results.rows[0].password.toString()

     bcrypt.compare(password, hash ,function(error,response){
       if(!response){
         return res.status(401).json({
           error: 'Invalid password'
         })
       }
            const token = jwt.sign(
        { user_id:results.rows[0].id},
        'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});

       res.status(200).json({
         user_id:results.rows[0].id,
         token:token
       })

   }
 )}
})
 }


const logout = (request, response,next) => {
    request.session.destroy((err) => {
      if(err) return next(err)

      request.logout()
      response.sendStatus(200)
    })
}



module.exports = {
    getAdmin,
    addAdmin,
    login,
    logout,
}
