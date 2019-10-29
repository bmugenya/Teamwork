const { pool } = require('../db_con')

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

  pool.query('INSERT INTO Admin (email, password) VALUES ($1, $2)', [email, password], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }
    response.status(201).json({ status: 'success', message: 'Admin added.' })
  })
}


module.exports = {
    getAdmin,
    addAdmin,
}
