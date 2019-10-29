const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Teamwork',
  password: 'Boywonder47',
  port: 5432,
})

module.exports = { pool }
