const User =require('../models/User');
const Message =require('../models/message');
const bcrypt =require('bcrypt');
const { createCustomError } = require('../errors/customError');
const asyncWrapper= require('../middlewares/asyncWrapper');

const createMsg = asyncWrapper(async(req,res,next)=>{
    console.log(req.body);
    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();
    
    res.status(200).json({
        sucess: true,
        data:savedMessage,
        message:'your msg send sucessfully',
    });

});

const getMsg = asyncWrapper(async(req,res,next)=>{
    
    const messages = await Message.find({
        conversationId: req.params.conversationId,
    });
    res.status(200).json({
        sucess: true,
        data:messages,
        message:'your msgs get sucessfully',
    });
});


module.exports={
    createMsg,
    getMsg
}