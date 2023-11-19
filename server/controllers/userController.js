const User =require('../models/User');
const Conversation =require('../models/conversation');
const Post =require('../models/Post');


const bcrypt =require('bcrypt');
const { createCustomError } = require('../errors/customError');
const generateToken =require('../utils/generateToken'); 
const asyncWrapper= require('../middlewares/asyncWrapper');


const getAllUsers = asyncWrapper(async(req,res,next)=>{

    const users = await User.find({});
    // console.log(users)
    res.status(200).json({
        sucess: true,
        data:users,
        message:'get all users sucessfully',
    })
});

const getUser = asyncWrapper(async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);

    if(!id){
        return next(createCustomError(`No user with id : ${id}`,404))
    }

    res.status(200).json({
        sucess: true,
        data:user,
        message:'get user sucessfully',
    })
});

const updateUser = asyncWrapper(async(req,res,next)=>{
    const authUserId = req.params.id;
    const user = await User.findById(authUserId);
    console.log(req.files.imageUrl[0].filename)
    console.log(req.files)
    if(!user){
        return next(createCustomError(`No user with id : ${id}`,404));
    }
    const{
        fullName,
        userName,
        email,
        password,
        imageUrl,
        bgImageUrl,
        bio,
        birthDate,
        following,
        followingBy,
        role
    } = req.body;
    console.log(req.body)
    let bg;
    let avatar;
    if(!req.files.bgImageUrl){
        bg =user.bgImageUrl;
    }else{
        bg =req.files.bgImageUrl[0].filename;
    }
    if(!req.files.imageUrl){
        avatar=user.imageUrl;
    }else{
        avatar=req.files.imageUrl[0].filename;
    }

    let updateUser = await User.findByIdAndUpdate(
        authUserId,
        {
            fullName,
            userName,
            email,
            password,
            imageUrl:avatar,
            bgImageUrl:bg,
            bio,
            birthDate,
            following,
            followingBy,
            role
        },
        { new: true } 
    );
    console.log(updateUser)

    res.status(200).json({
        sucess: true,
        data:updateUser,
        message:'update user sucessfully',
    })

});

const followUser = asyncWrapper(async(req,res,next)=>{
    const userId = req.params.id;
    const authUserId = req.user.id;
    console.log(authUserId)
    console.log(userId)
    if(userId === authUserId){
        return next(createCustomError(`You cannot follow your own profile`,400));
    }

    const [authUserProfile, profileToFollow] = await Promise.all([
        User.findOne({ _id: authUserId }),
        User.findOne({ _id: userId }),
    ]);

    if (!profileToFollow) {
        return next(createCustomError(`Profile does not exists`,404));
    }
    
    if (authUserProfile.isFollowing(userId)) {
        return next(createCustomError(`You already follow that profile`,400));
    }

    profileToFollow.followedBy.push(authUserId);

    await Promise.all([
        authUserProfile.follow(userId), 
        profileToFollow.save()
    ]);
    res.status(200).json({
        sucess: true,
        data:authUserProfile,
        message:'follow done sucessfully',
    });
});

const unfollowUser = asyncWrapper(async(req,res,next)=>{
    const userId = req.params.id;
    const authUserId = req.user.id;
    console.log(authUserId)
    console.log(userId)
    if(userId === authUserId){
        return next(createCustomError(`You cannot unfollow your own profile`,400));
    }

    const [authUserProfile, profileToFollow] = await Promise.all([
        User.findOne({ _id: authUserId }),
        User.findOne({ _id: userId }),
    ]);

    if (!profileToFollow) {
        return next(createCustomError(`Profile does not exists`,404));
    }
    
    if (!authUserProfile.isFollowing(userId)) {
        return next(createCustomError(`You do not follow that profile`,400));
    }

    profileToFollow.followedBy.remove(authUserId);

    await Promise.all([authUserProfile.unfollow(userId), profileToFollow.save()]);

    res.status(200).json({
        sucess: true,
        data:authUserProfile,
        message:'unfollow done sucessfully',
    });
});

const getAllFollowing = asyncWrapper(async(req,res,next)=>{

});
const getAllFollowers= asyncWrapper(async(req,res,next)=>{

});


const deleteUser = asyncWrapper(async(req,res,next)=>{
    const id = req.params.id;
    console.log(req)
    const user = await User.deleteOne({_id:id});
    
    res.status(200).json({
        sucess: true,
        data:user,
        message:'delete user sucessfully',
    })
})


module.exports={
    getUser,
    getAllUsers,
    updateUser,
    followUser,
    unfollowUser,
    getAllFollowers,
    getAllFollowing,
    deleteUser
}




