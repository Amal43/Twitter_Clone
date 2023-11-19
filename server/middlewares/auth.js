const Jwt = require('jsonwebtoken');
const { createCustomError } = require('../errors/customError');

const authenticationMiddleware = async(req,res,next)=>{
    
    const authHeader=req.headers.authorization;
    // console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(createCustomError(`No token provided`, 401));
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        const { id, email } = decoded;
        req.user = { id, email};
        // console.log(req.user)
        next();
    } catch (error) {
        return next(createCustomError(`Not authorized to access this route`, 401));
    }
}

module.exports = authenticationMiddleware;

