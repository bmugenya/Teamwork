const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const config = require('./config/cloudinaryConfig');


const app = express();
const model = require('./model/model');
const auth = require('./middleware/auth');
const multer = require('./middleware/multer');

const uploader = config.uploader;
const cloudinaryConfig = config.cloudinaryConfig;
const multerUploads = multer.multerUploads;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use('*', cloudinaryConfig);



app.post('/api/v1/auth/signin', model.signIn);

//ADMIN
app.post('/api/v1/auth/create-user', model.createUser);
app.get('/api/v1/flags',auth, model.getFlags);
app.delete('/api/v1/flag',auth, model.deleteFlag);

//EMPLOYEE
app.post('/api/v1/articles',auth, model.createArticle);
app.post('/api/v1/gifs',auth,multerUploads, model.createGif);
app.patch('/api/v1/articles/:id',auth, model.editArticle);
app.delete('/api/v1/articles/:id',auth, model.deleteArticle);
app.delete('/api/v1/gifs/:id',auth, model.deleteGif);
app.post('/api/v1/articles/:id/comment',auth, model.commentArticle);
app.post('/api/v1/gifs/:id/comment',auth, model.commentGif);
app.get('/api/v1/feed',auth, model.feed);
app.get('/api/v1/articles/:id',auth, model.viewArticle);
app.get('/api/v1/gifs/:id',auth, model.viewGif);
app.get('/api/v1/feed/search',auth, model.viewCategory);
app.post('/api/v1/articles/:id/flag',auth, model.flagArticle);
app.post('/api/v1/gifs/:id/flag',auth, model.flagGif);

app.delete('/api/v1/employee/:id',model.deleteEmployee);



module.exports = app;
