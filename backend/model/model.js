const { pool } = require('../db_con');
const bcrypt = require('bcrypt');

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


});



}


const login = (request, response) => {
  pool.query('SELECT * FROM Admin', (error, results) => {
    if (error) {
      response.status(400).json({
          error:error
      });
    }
    response.status(200).json(results.rows)
  })
}





module.exports = {
    getAdmin,
    addAdmin,
    login,
}
