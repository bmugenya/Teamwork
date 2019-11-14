// IMPORTS
const { pool } = require('../db_con');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('../middleware/multer');
const config = require('../config/cloudinaryConfig');

// DECLARATION
const multerUploads = multer.multerUploads;
const uploader = config.uploader;
const cloudinaryConfig = config.cloudinaryConfig;
const dataUri = multer.dataUri;
const saltRounds = 10;


const createUser = (request, response) => {

  // ADMIN CREDENTIALS
  var adminEmail = request.body.adminEmail;
  var adminPassword = request.body.adminPassword;


  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var email = request.body.email;
  var password = request.body.password;
  var gender = request.body.gender;
  var jobRole= request.body.jobRole;
  var department = request.body.department;
  var address = request.body.address;
  var is_admin = request.body.is_admin;

  // ADMIN VERIFICATION
  pool.query('select employee_id, password,is_admin from Employee where email = $1 and is_admin = $2',
  [adminEmail,"t"],function(error,results,fields) {

    if(results.rows.length === 0){

      response.status(401).json({ status: "error", error:"Admin user does not exist" });

    } else {

      var hash = results.rows[0].password.toString();
      bcrypt.compare(adminPassword, hash ,function(error,res){
        if(!res){
          return response.status(401).json({status: "error", error: 'Invalid password' });
        }

      bcrypt.hash(password, saltRounds, function(err, hash) {
        pool.query('INSERT INTO Employee (firstName,lastName,email,password,gender,jobRole,department,address,is_admin ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [firstName,lastName,email,hash,gender,jobRole,department,address,is_admin], error => {
          if (error) {
            response.status(400).json({status: "error", error:error.detail });
          }

          pool.query("select currval(pg_get_serial_sequence('Employee','employee_id')) as user_id",
          function(error,results,fields){
            if(error) throw error;

            var user_id = results.rows[0].user_id;
            var token = jwt.sign({ user_id:user_id},'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});

            response.status(201).json({
              status: 'success',
              data : {
                message: 'User account successfully created',
                token:token,
                userId: user_id
              }
            });
          });
        });
      });
    });
  }
});
};

const signIn = (request, res, next) => {
  var { username, password } = request.body;

  pool.query('select employee_id, password from Employee where email = $1',
  [username],function(error,results,fields) {

    if(results.rows.length === 0){
      res.status(401).json({ status: "error", error:"user does not exist" });

    } else {

      var hash = results.rows[0].password.toString();
      bcrypt.compare(password, hash ,function(error,response){
        if(!response){
          return res.status(401).json({ status: "error", error: 'Invalid password' });
        }

        var user_id = results.rows[0].employee_id;

        var token = jwt.sign({ user_id:user_id},'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});


        res.status(200).json({
          "status": "success",
          "data":{
            token:token,
            user_id:user_id
          }
         });
      });
    }
  });
};





const createArticle = (request, response) => {
  var { title, article, employee_id } = request.body;


  pool.query('INSERT INTO Article (title, article, employee_id) VALUES ($1, $2,$3)',
  [title, article, employee_id], error => {
    if (error) {
      response.status(401).json({
        status:"error",
        error:error.detail
      });
    }

    pool.query("select currval(pg_get_serial_sequence('Article','article_id')) as article_id",
    function(error,results,fields){
      if(error) throw error;

      var article_id = results.rows[0].article_id;
      var now = new Date();

      response.status(201).json({
       status: 'success',
       data :{
         message: 'Article successfully posted' ,
         articleId: article_id,
         createdOn:now,
         title:title
        }
      });
    });
  });

};



const createGif = (request, response) => {

  var file = dataUri(request).content;
  var title = request.body.title;
  var employee_id = request.body.employee_id;

  return uploader.upload(file).then((result) => {
    var image = result.url;

    pool.query('INSERT INTO Gifs (imageUrl ,title,employee_id) VALUES ($1, $2,$3)',
    [image, title,employee_id], error => {
      if (error) {
        response.status(401).json({ status:"error", error:error.detail });
      }

    pool.query("select currval(pg_get_serial_sequence('Gifs','gif_id')) as gif_id",
    function(error,results,fields){
      if(error) throw error;

      var gif_id = results.rows[0].gif_id;
      var now = new Date();

      response.status(201).json({
        status: 'success',
        data : {
          gifId: gif_id,
          message: 'GIF image successfully posted',
          createdOn:now,
          title:title,
          imageUrl:image
        }
      });
    });
  });
});
};





const editArticle = (request, response) => {

  var articleId = parseInt(request.params.id);
  var { title, article,employee_id } = request.body;

  pool.query('UPDATE Article SET title = $1, article = $2 WHERE article_id = $3 AND employee_id = $4',
  [title, article,articleId, employee_id], (error,results) => {

    if(error){
      response.status(401).json({ status:"error", error:error.detail});
    }

    if(results.rowCount){

      response.status(200).json({
        status: 'success',
        data :{
         message: 'Article successfully updated',
         title: title,
         article: article
       }
      });

    }  else  {
      response.status(401).json({ status:'error'});
    }

  });

};


const deleteArticle = (request, response) => {

  var articleId = parseInt(request.params.id);
  var { employee_id }  = request.body;

  pool.query('DELETE FROM Article WHERE article_id = $1 AND employee_id = $2',
  [articleId, employee_id], (error,results) => {

    if(error){
      response.status(401).json({status:"error",error:error.detail});
    }

    if(results.rowCount){


   response.status(200).json({
     status: 'success',
      data :{
      message: 'Article successfully deleted'
      }
    });
  } else {
    response.status(401).json({status: 'error'});
  }
});
};


const deleteGif = (request, response) => {

  var articleId = parseInt(request.params.id);
  var { employee_id }  = request.body;

  pool.query('DELETE FROM Gifs WHERE gif_id = $1 AND employee_id = $2',
  [articleId, employee_id], (error,results) => {

    if(error){
      response.status(401).json({status:"error", error:error.detail});
    }

    if(results.rowCount){

      response.status(200).json({
        status: 'success',
        data :{
          message: 'gif post successfully deleted'
        }
      });
    } else {
     response.status(401).json({ status: 'error'});
    }

  });
};

const commentArticle = (request, response) => {

  var articleId = parseInt(request.params.id);
  var { comment,employee_id } = request.body;

  pool.query('SELECT title,article FROM Article WHERE article_id = $1',
  [articleId], (error, results) => {
  if(error) {
    response.status(400).json({status:"error", error:error.detail });
  }

  if(results.rows[0]){

    pool.query('INSERT INTO CommentArticle (comment,employee_id,article_id) VALUES  ($1, $2,$3)',
    [comment,employee_id,articleId], error => {

      if(error) {
        response.status(401).json({status:"error",error:error.detail});
      }

      var now = new Date();
      response.status(201).json({
        status: 'success',
        data :{
          message: 'Comment successfully created',
          createdOn:now,
          articleTitle: results.rows[0].title,
          article:results.rows[0].article,
          comment:comment
        }
      });
    });
  }  else  {

    response.status(401).json({ status: 'error'});
  }
});
};

const commentGif = (request, response) => {

  var gifId = parseInt(request.params.id);
  var { comment,employee_id } = request.body;

  pool.query('SELECT title FROM Gifs WHERE gif_id = $1',
  [gifId], (error, results) => {
    if (error) {
      response.status(401).json({status:"error",error:error.detail});
    }

    if(results.rows[0]){

      pool.query('INSERT INTO CommentGif (comment,employee_id,gif_id) VALUES  ($1, $2,$3)',
      [comment,employee_id,gifId], error => {

        if (error) {
         response.status(401).json({status:"error",error:error.detail});
        }

        var now = new Date();
        response.status(201).json({
          status: 'success',
          data : {
            message: 'Comment successfully created',
            createdOn:now,
            gifTitle: results.rows[0].title,
            comment:comment
          }
        });
      });
    } else {
     response.status(401).json({status:'error'});
    }
  });
};



const feed = (request, response) => {
  pool.query('SELECT * FROM Article ORDER BY article_id DESC', (error, results) => {
    if(error){
      response.status(400).json({status:"error",error:error.detail});
    }

    response.status(200).json(results.rows);
  });
};

const viewArticle = (request, response) => {

  var articleId = parseInt(request.params.id);
  pool.query('SELECT * FROM Article WHERE article_id = $1', [articleId], (error, results) => {
    if(error){
      response.status(401).json({status:"error",error:error.detail});
    }
    response.status(200).json(results.rows);
  });
};

const viewGif = (request, response) => {

  var gifId = parseInt(request.params.id);
  pool.query('SELECT * FROM Gifs WHERE gif_id = $1',
  [gifId], (error, results) => {
    if(error){
      response.status(400).json({status:"error",error:error.detail});
    }
    response.status(200).json(results.rows);
  });
};


const viewCategory = (request, response) => {

  var article = request.query.category;

  pool.query('SELECT * FROM Article WHERE title ILIKE $1 ORDER BY article_id DESC', [ article + '%'],
   (error, results) => {
    if(error){
      response.status(401).json({status:"error",error:error.detail});
    }

    response.status(200).json(results.rows);
  });
};


const flagArticle = (request, response) => {
  var articleId = parseInt(request.params.id);
  var {comment,employee_id } = request.body;
  var type = 'Article';

  pool.query('SELECT article,title FROM Article WHERE article_id = $1',
  [articleId], (error, results) => {
    if(error){
      response.status(401).json({status:"error",error:error.detail});
    }

   if(results.rows[0]){
    var flag = results.rows[0].article;
    var flag_title = results.rows[0].title;

  pool.query('INSERT INTO Flagged (comment,type,flag,flag_title,type_id,employee_id) VALUES ($1,$2,$3,$4,$5,$6)',
  [comment,type,flag,flag_title,articleId,employee_id], error => {
    if(error){
      response.status(401).json({status:"error",error:error});
    }

    const now = new Date();
    response.status(201).json({
      status: 'success',
      data :{
       message: 'Article Reported',
       createdOn:now,
       article:flag,
       articleTitle:flag_title,
       comment:comment
      }
    });

  });

 } else {
    response.status(401).json({status: 'error'});

  }
});
};



const flagGif = (request, response) => {

  var gifId = parseInt(request.params.id);
  var {comment,employee_id } = request.body;
  var type = 'Gif';


   pool.query('SELECT imageUrl,title FROM Gifs WHERE gif_id = $1',[gifId], (error, results) => {
    if(error){
      response.status(401).json({statuse:"error",error:error.detail});
    }

   if(results.rows[0]){

    var flag_title= results.rows[0].title;
    var flag = results.rows[0].imageurl;
    pool.query('INSERT INTO Flagged (comment,type,flag,flag_title,type_id,employee_id) VALUES ($1,$2,$3,$4,$5,$6)',
    [comment,type,flag,flag_title,gifId,employee_id], error => {
      if(error){
        response.status(401).json({status:"error",error:error.detail});
      }

     const now = new Date();
     response.status(201).json({
      status: 'success',
      data :{
        message: 'Gif Reported',
        createdOn:now,
        image:flag,
        gifTitile:flag_title,
        comment:comment
      }
    });
  });
} else {
  response.status(401).json({status:'error'});
}
}
);};



const getFlags = (request, response) => {
  pool.query('SELECT * FROM Flagged', (error, results) => {
    if (error) {
      response.status(401).json({status:"error",error:error});
    }
    response.status(200).json(results.rows);
  });
};


const deleteFlag = (request, response) => {

  var { type, type_id }  = request.body;
  if(type.toLowerCase() == 'article'){

    pool.query('DELETE FROM Article WHERE id = $1', [type_id], (error,results) => {

      if(error){
        response.status(401).json({status:"error",error:error.detail});
      }

      if(results.rowCount){

      response.status(200).json({
       status: 'success',
       data :{
         message: 'Article successfully deleted'
       }
      });
    }  else  {
      response.status(401).json({status: 'error'});
    }

  });

} else if(type.toLowerCase() == 'gif'){

   pool.query('DELETE FROM Gifs WHERE gif_id = $1', [type_id], (error,results) => {
    if(error){
      response.status(401).json({status:"error",error:error});
    }

    if(results.rowCount){

    response.status(200).json({
      status: 'success',
      data :{
       message: 'gif post successfully deleted'
      }
     });
    }  else  {
     response.status(401).json({status: 'error'});
    }
  });
}

};



module.exports = {
    createUser,
    signIn,
    createArticle,
    createGif,
    editArticle,
    deleteArticle,
    deleteGif,
    commentArticle,
    commentGif,
    feed,
    viewArticle,
    viewGif,
    viewCategory,
    flagArticle,
    flagGif,
    getFlags,
    deleteFlag
};
