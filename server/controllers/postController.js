const User =require('../models/User');
const Post =require('../models/Post');
const bcrypt =require('bcrypt');
const { createCustomError } = require('../errors/customError');
const asyncWrapper= require('../middlewares/asyncWrapper');


const createPost = asyncWrapper(async(req,res,next)=>{

    const userId= req.user.id;
    const user = await User.findById(userId);
    console.log(req.file)
    console.log(req.body)
    let postImage;
    if(!req.file){
        postImage=' ';
    }else{
        postImage=req.file.filename;
    }

    const newPost= new Post({
        user:userId,
        content:req.body.content,
        postImage,
        likes:[],
        comments:[]
    });
    await newPost.save();

    res.status(200).json({
        sucess: true,
        data:newPost,
        message:'you post sucessfully',
    })

});

const getAllPosts = asyncWrapper(async(req,res,next)=>{
    const posts = await Post.find({}).
    populate({ path: 'user'}).sort({ createdAt: -1 });
    res.status(200).json({
        sucess: true,
        data:posts,
        message:'get all posts sucessfully',
    })
});

const getPostById = asyncWrapper(async(req,res,next)=>{
    const postId =req.params.postId
    const post = await Post.findById(postId).
    populate({ path: 'user'}).
    populate({path:'comments.user'});

    if (!post) {
        return next(createCustomError(`post not found`,404));
    }

    res.status(200).json({
        sucess: true,
        data:post,
        message:'get post sucessfully',
    })
});

const addComment = asyncWrapper(async(req,res,next)=>{
        const postId=req.params.postId;
        const userId= req.user.id;
        const comment=req.body.comment;
        console.log(req.body)
        const post = await Post.findById(postId);
        let user = await User.findById(userId);

        if (!post) {
            return next(createCustomError(`post not found`,404));
        }
        if (!comment) {
            return next(createCustomError(`please provide comment`,400));
        }

        let updatePost= await Post.findOneAndUpdate(
            {_id : postId},
            { 
                $push:{
                    "comments":[{
                        "user": userId,
                        "content":comment,
                    }]
                }
            },
            {new:true}
        );
        if(updatePost){
            var io = req.app.get('socketio');
            io.to(socket.id).emit("commentAdded",user);
        }
        

        console.log(updatePost)
        res.status(200).json({
            sucess: true,
            data:updatePost,
            message:'comment added on post sucessfully',
        });
});

const like = asyncWrapper(async(req,res,next)=>{
    const postId=req.params.postId;
    const userId= req.user.id;

    const post = await Post.findById(postId);
    // console.log(post)
    // console.log(userId)
    if (!post) {
        return next(createCustomError(`post not found`,404));
    }

    let updatePost= await Post.findOneAndUpdate(
        {_id : postId},
        { 
            $push:{
                "likes":userId
            }
        },
        {new:true}
    );
    // console.log(updatePost)
    
    res.status(200).json({
        sucess: true,
        data:updatePost,
        message:'like action on post done sucessfully',
    });
});

const unLike = asyncWrapper(async(req,res,next)=>{
    const postId=req.params.postId;
    const userId= req.user.id;

    const post = await Post.findById(postId);
    // console.log(post)
    if (!post) {
        return next(createCustomError(`post not found`,404));
    }

    let updatePost= await Post.findOneAndUpdate(
        {_id : postId},
        { 
            $pull:{
                "likes":userId
            }
        },
        {new:true}
    );
    console.log(updatePost)
    
    res.status(200).json({
        sucess: true,
        data:updatePost,
        message:'unlike action on post done sucessfully',
    });
});

module.exports={
    createPost,
    getAllPosts,
    getPostById,
    addComment,
    like,
    unLike

}