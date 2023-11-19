const User =require('../models/User');
const Conversation =require('../models/conversation');
const bcrypt =require('bcrypt');
const { createCustomError } = require('../errors/customError');
const asyncWrapper= require('../middlewares/asyncWrapper');


const createCon = asyncWrapper(async(req,res,next)=>{
    const senderId = req.user.id;
    console.log('senderId',senderId)
    const receiverId = req.body.id;
    console.log(req.body)
    console.log('receiverId',receiverId)

    const conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
    });
    
    if(conversation){
        return next(createCustomError(`conversation already exist`,400));
    }
    if(!receiverId){
        return next(createCustomError(`receiverId is required`,400));
    }
    
    const newConversation = new Conversation({
        members: [senderId, receiverId],
    });
    
    console.log(newConversation)
    const savedConversation = await newConversation.save();
    
    res.status(200).json({
        sucess: true,
        data:savedConversation,
        message:'your con create sucessfully',
    })

});

const conversations = asyncWrapper(async(req,res,next)=>{
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });

        res.status(200).json({
            sucess: true,
            data:conversation,
            message:'get user converstions sucessfully',
        })
}); 



module.exports={
    createCon,
    conversations
}