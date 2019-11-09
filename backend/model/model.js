 const { pool } = require('../db_con')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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



module.exports = {
    getAdmin,
    addAdmin,
    adminLogin,
    logout,
    addEmployee,
    employeeLogin,
}
