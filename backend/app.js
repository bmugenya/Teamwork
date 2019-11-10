const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path');

const config = require('./config/cloudinaryConfig')


const app = express()
const model = require('./model/model')
const auth = require('./middleware/auth')
const multer = require('./middleware/multer')

const uploader = config.uploader
const cloudinaryConfig = config.cloudinaryConfig
const multerUploads = multer.multerUploads

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use('*', cloudinaryConfig);


app.post('/api/v1/logout',model.logout)

//ADMIN
app.post('/api/v1/auth/create-admin', model.addAdmin)
app.post('/api/v1/auth/create-user',auth, model.addEmployee)
app.post('/api/v1/auth/admin/signin', model.adminLogin)
app.get('/api/v1/getadmin',auth, model.getAdmin)

//EMPLOYEE
app.post('/api/v1/auth/signin', model.employeeLogin)
app.post('/api/v1/articles',auth, model.newArticle)
app.post('/api/v1/gifs',auth,multerUploads, model.newGif)
app.patch('/api/v1/articles/:id',auth, model.updateArticle)
app.delete('/api/v1/articles/:id',auth, model.deleteArticle)
app.delete('/api/v1/gifs/:id',auth, model.deleteGif)

module.exports = app;
