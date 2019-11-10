 const { pool } = require('../db_con')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('../middleware/multer')

const config = require('../config/cloudinaryConfig')
const multerUploads = multer.multerUploads

const uploader = config.uploader
const cloudinaryConfig = config.cloudinaryConfig


const dataUri = multer.dataUri

const saltRounds = 10;

//  ADMIN FUNCTIONALITY
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

  bcrypt.hash(password, saltRounds, function(err, hash) {
  pool.query('INSERT INTO Admin (email, password) VALUES ($1, $2)', [email, hash], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }
   response.status(201).json({ status: 'success', message: 'Admin added.' })

    })

  })
}


const adminLogin = (request, res, next) => {
    const { username, password } = request.body
   pool.query('select id, password from admin where email = $1',[username],function(error,results,fields) {


    if(results.rows.length === 0){
       res.status(400).json({
         message:"user does not exist"

       })
    } else{
     const hash = results.rows[0].password.toString()

     bcrypt.compare(password, hash ,function(error,response){
       if(!response){
         return res.status(401).json({
           error: 'Invalid password'
         })
       }
            const token = jwt.sign(
        { user_id:results.rows[0].id},
        'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});

       res.status(200).json({
         user_id:results.rows[0].id,
         token:token
       })

   }
 )}
})
 }


const logout = (request, response,next) => {
    request.session.destroy((err) => {
      if(err) return next(err)

      request.logout()
      response.sendStatus(200)
    })
}


const addEmployee = (request, response) => {

  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;
  const gender = request.body.gender;
  const jobRole= request.body.jobRole;
  const department = request.body.department;
  const address = request.body.address;

bcrypt.hash(password, saltRounds, function(err, hash) {
  pool.query('INSERT INTO Employee (firstName,lastName,email,password,gender,jobRole,department,address ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
   [firstName,lastName,email,hash,gender,jobRole,department,address], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }
    pool.query("select currval(pg_get_serial_sequence('Employee','id')) as user_id",function(error,results,fields){

    if(error) throw error;

    const user_id = results.rows[0].user_id
    const token = jwt.sign({ user_id:user_id},'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});

   response.status(201).json({
     status: 'success',
     data : {
     message: 'User account successfully created',
     token:token,
     userId: user_id

   }

   })

    })

  })
})

}



const employeeLogin = (request, res, next) => {
    const { username, password } = request.body
   pool.query('select id, password from Employee where email = $1',[username],function(error,results,fields) {


    if(results.rows.length === 0){
       res.status(400).json({
         message:"user does not exist"

       })
    } else{
     const hash = results.rows[0].password.toString()

     bcrypt.compare(password, hash ,function(error,response){
       if(!response){
         return res.status(401).json({
           error: 'Invalid password'
         })
       }
            const token = jwt.sign(
        { user_id:results.rows[0].id},
        'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});

       res.status(200).json({
         user_id:results.rows[0].id,
         token:token
       })

   }
 )}
})
 }




const newArticle = (request, response) => {
  const { title, article, employee_id } = request.body


  pool.query('INSERT INTO Article (title, article, employee_id) VALUES ($1, $2,$3)', [title, article, employee_id], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }

    pool.query("select currval(pg_get_serial_sequence('Article','id')) as article_id",function(error,results,fields){
    if(error) throw error;

    const article_id = results.rows[0].article_id
    const now = new Date()
   response.status(201).json({
     status: 'success',
     data :{
       message: 'Article successfully posted' ,
       articleId: article_id,
       createdOn:now,
       title:title
     }
   })

    })
      })

  }



const newGif = (request, response) => {

  const file = dataUri(request).content;
  const title = request.body.title;
  const employee_id = request.body.employee_id

  return uploader.upload(file).then((result) => {
    const image = result.url;


  pool.query('INSERT INTO Gifs (imageUrl , title,employee_id) VALUES ($1, $2,$3)', [image, title,employee_id], error => {
    if (error) {
         response.status(400).json({
         error:error
      });
    }

    pool.query("select currval(pg_get_serial_sequence('Gifs','id')) as gif_id",function(error,results,fields){
    if(error) throw error;

    const gif_id = results.rows[0].gif_id
    const now = new Date()

   response.status(201).json({
     status: 'success',
     data : {
       gifId: gif_id,
       message: 'GIF image successfully posted',
       createdOn:now,
       title:title,
       imageUrl:image

      }

     })

    })
      })

})
}





const updateArticle = (request, response) => {

  const articleId = parseInt(request.params.id)


  const { title, article,employee_id } = request.body


  pool.query('UPDATE Article SET title = $1, article = $2 WHERE id = $3 AND employee_id = $4',
    [title, article,articleId, employee_id], (error,results) => {

    if (error) {
         response.status(400).json({
         error:error
      });
    }

    if(results.rowCount){


   response.status(200).json({
     status: 'success',
     data :{
       message: 'Article successfully updated',
       title: title,
       article: article
     }
   })
}else{
     response.status(400).json({
     status: 'NOT ALLOWED',
   })
}

    })


  }




const deleteArticle = (request, response) => {

  const articleId = parseInt(request.params.id)
  const { employee_id }  = request.body


  pool.query('DELETE FROM Article WHERE id = $1 AND employee_id = $2', [articleId, employee_id], (error,results) => {

    if (error) {
         response.status(400).json({
         error:error
      });
    }

    if(results.rowCount){


   response.status(200).json({
     status: 'success',
     data :{
       message: 'Article successfully deleted'

     }
   })
}else{
     response.status(400).json({
     status: 'Article NOT FOUND',
   })
}

    })


  }




module.exports = {
    getAdmin,
    addAdmin,
    adminLogin,
    logout,
    addEmployee,
    employeeLogin,
    newArticle,
    newGif,
    updateArticle,
    deleteArticle,
}
