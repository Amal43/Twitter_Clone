const  Jwt =require("jsonwebtoken");

const generateToken = async(payload)=>{
    const token = await Jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '90d' }
    )
    return token;
}

module.exports= generateToken;