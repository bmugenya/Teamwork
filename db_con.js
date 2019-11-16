const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: 'funqixdonakrfp',
  host: 'ec2-107-21-226-44.compute-1.amazonaws.com',
  database: 'd1vphkd98i0q7c',
  password: 'e0a3a86342dce17fa8b425c3386bc33d6d953fb4b3cc2b01bca77c37ed667cad',
  port: 5432
});

module.exports = { pool };
