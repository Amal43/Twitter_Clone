const User =require('../models/User');
const bcrypt =require('bcrypt');
const { createCustomError } = require('../errors/customError');
const generateToken = require('../utils/generateToken');
const asyncWrapper= require('../middlewares/asyncWrapper');
const attachCookiesToResponse =require ('../utils/Jwt.js');

const register= asyncWrapper(async(req,res,next)=>{
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

    const emailAlreadyExists= await User.findOne({email:email});
    if(emailAlreadyExists){ 
        return next(createCustomError(`Email already exists`, 400));
    }   
    const hashPassword= await bcrypt.hash(password,10);

    const newUser= new User({
        fullName,
        userName,
        email,
        password:hashPassword,
        imageUrl,
        bgImageUrl,
        bio,
        birthDate,
        following,
        followingBy,
        role
    })
    console.log(newUser)
    const token= await generateToken({email:newUser.email,id:newUser._id});
    console.log(token)
    await newUser.save();
    res.status(201).json({
        sucess: true,
        data:newUser,
        message:'user sucessfully added',
        token:token
    })

});

const login = asyncWrapper(async(req,res,next)=>{
    const{email,password} = req.body;
    console.log(req.body)

    if(!email || !password){
        return next(createCustomError(`Please provide email and password`, 400));
    }

    const user = await User.findOne({email:email});
    
    if(!user){
        return next(createCustomError(`Invalid Credentials email`, 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
    if (!isPasswordCorrect) {
        return next(createCustomError(`Invalid Credentials password`, 401));
    }
    

    const tokenUser = await generateToken({email:user.email,id:user._id});

    console.log(user)
    // attachCookiesToResponse({ res, user: tokenUser });

    res.status(201).json({
        sucess: true,
        data:user,
        message:'user sucessfully login',
        token:tokenUser
    })

});


const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports={
    register,
    login,
    logout
}