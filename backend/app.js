const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const model = require('./model/model')
const auth = require('./middleware/auth')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/api/v1/logout',model.logout)

//ADMIN
app.post('/api/v1/auth/create-admin', model.addAdmin)
app.post('/api/v1/auth/create-user',auth, model.addEmployee)
app.post('/api/v1/auth/admin/signin', model.adminLogin)
app.get('/api/v1/getadmin',auth, model.getAdmin)

//USER
app.post('/api/v1/auth/signin', model.employeeLogin)


module.exports = app;
