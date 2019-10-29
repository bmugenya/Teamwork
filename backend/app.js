const express = require('express')
const bodyParser = require('body-parser')
const { pool } = require('./db_con')

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const getAdmin = (request, response) => {
  pool.query('SELECT * FROM Admin', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const addAdmin = (request, response) => {
  const { email, password } = request.body

  pool.query('INSERT INTO Admin (email, password) VALUES ($1, $2)', [email, password], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Admin added.' })
  })
}

app.get('/admin/getadmin',getAdmin)
app.post('/admin/addadmin', addAdmin)


module.exports = app;
