const {StatusCodes}=require('http-status-codes')
const db = require('../models/index.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {ValidationError}=require('sequelize')
async function signUp(req,res) {
    try {
        const {email,password,roleId}=req.body
    if(!email||!password||!roleId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error:"These entries cannot be null"
        })
    }
    const user=await db.User.findOne({
        where:{email}
    })
    if(user){
        return res.status(StatusCodes.BAD_REQUEST).json("User already exist")
    }

    const hashedPassword=await bcrypt.hash(password,15)
    const response=await db.User.create({
        email,
        password:hashedPassword,
        roleId
    })
    return res.status(StatusCodes.CREATED).json({
        respond:response,
        message:"User created successfully"
    })
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors
            console.error('Validation Errors:');
            error.errors.forEach((err) => {
              console.error(`${err.path}: ${err.message}`);
            });
          } else {
            // Handle other types of errors
            console.error('Error: while', error);
          }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while registering a user")
    }
}
async function signIn(req,res){
    try {
        const{email,password}=req.body
    if(!email||!password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error:"These entries cannot be null"
        })
    }

    const user=await db.User.findOne({
        where:{email}
    })
    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json("User not found")
    }

    const verifyPassword=await bcrypt.compare(password,user.password)
    if(!verifyPassword){
        return res.status(StatusCodes.NOT_FOUND).json('Incorrect password')
    }
    const token=jwt.sign({id:user.roleId,email:user.email},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_REFRESH_EXPIRATION})
        return res.status(StatusCodes.OK).json({
            id: user.id,
            email: user.email,
            accessToken: token
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors
            console.error('Validation Errors:');
            error.errors.forEach((err) => {
              console.error(`${err.path}: ${err.message}`);
            });
          } else {
            console.error('Error: while', error);
          }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Sign In Error")
    }
    
}
module.exports={signUp,signIn}

