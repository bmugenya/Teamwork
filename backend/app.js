const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const model = require('./model/model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/admin/getadmin',model.getAdmin)
app.post('/admin/addadmin', model.addAdmin)
app.post('/admin/auth', model.login)


module.exports = app;
