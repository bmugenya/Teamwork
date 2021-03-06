const jwt = require('jsonwebtoken');

module.exports = (request,response,next) => {
    try {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const user_id = decodedToken.user_id;
        if(request.body.user_id && request.body.user_id !== user_id){
            throw 'Invalid user ID';
        }else{
            next();
        }

     } catch(error) {
         response.status(401).json({
             status:'Error',
             error: error
         });
     }

};
