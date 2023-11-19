const mongoose =require('mongoose');
const validator =require('validator');

const userSchema=new mongoose.Schema(
    {
        fullName:{
            type: String,
            // required :[true, 'Please provide name'],
            min: 2,
            max : 50
        },
        userName:{
            type: String,
            min: 2,
            max : 50
        },
        email: {
            type: String,
            // required : [true, 'Please provide email'],
            unique :true,
            max:50,
            validate:[validator.isEmail,'please enter valid email']
        },
        password:{
            type: String,
            // required:[true, 'Please provide password'],
            min:5
        },
        imageUrl:{
            type: String,
            default:"avatar.jfif"
        },
        bgImageUrl:{
            type: String,
            default:"bg.png"
        },
        bio:{
            type:String,
            default:""
        },
        birthDate: {
            type: Date,
            // required: [true, 'Please provide birthDate'],
        },
        following: [
            { type: mongoose.Schema.ObjectId, ref: 'user' }
        ],
        followedBy: [
            { type: mongoose.Schema.ObjectId, ref: 'user' }
        ],
        role:{
            type: String,
            Enum:['admin' ,'user'],
            default: 'user'
        },
        location: String,
        // occupation: String,
        // viewedProfile: Number,
        // impressions: Number,
    },
    {timestamps:true}
);

userSchema.methods.follow = function (userId){
    if(!this.following.some((id)=> id.equals(userId))){
        this.following.push(userId);
        return this.save();
    }
    return Promise.resolve();
}

userSchema.methods.unfollow = function (userId){
    if(this.following.some((id)=> id.equals(userId))){
        this.following.remove(userId);
        return this.save();
    }
    return Promise.resolve();
}

userSchema.methods.isFollowing = function (userId) {
    return this.following.some((id) => id.equals(userId));
};





const User=mongoose.model('User', userSchema);
module.exports=User;