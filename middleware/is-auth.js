const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    // value from authorization header    
    const authHeader = req.get('Authorization');
    if(!authHeader){   
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    // console.log('token',token);
    let decodedToken;
    try{
        //decoding token using secretkey
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch {
        const error = new Error('Not authenticated.');
        error.statusCode = 500;
        throw error;
    }
    
    if(!decodedToken){
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }

    // storing userId from token into req
    req.userId = decodedToken.userId;

    // for moving next
    next();
}