const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const model = require('./model/model')
const auth = require('./middleware/auth')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/api/v1/getadmin',auth, model.getAdmin)
app.post('/api/v1/auth/signin', model.addAdmin)
app.post('/api/v1/login', model.login)
app.post('/api/v1/logout',model.logout)

module.exports = app;
