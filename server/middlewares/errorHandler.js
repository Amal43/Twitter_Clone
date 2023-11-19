const { CustomAPIError } = require('../errors/customError');


const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode)
                    .json({
                        sucess:false, 
                        message: err.message,
                        statusCode:err.statusCode ,
                        data:null
                    });
    }
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        statusCode = 400
        return res.status(400)
                    .json({
                        sucess:false, 
                        message: message,
                        statusCode:statusCode 
                        ,data:null
                    });
    }
    return res.status(500)
                .json({
                    sucess:false, 
                    message: 'Something went wrong, please try again' 
                });
}

module.exports = errorHandlerMiddleware;

