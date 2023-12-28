const HttpError = require("../models/errorModel")
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


//  ========================== Register a new user
// POST : /api/users/register
// UNPROTECTED
const registerUser = async (req,res,next)=>{
    try{
         const {name,email,password,password2} = req.body;
         if(!name || !email || !password){
                return next(new HttpError('Fill in all fields',422))
         }   

         const newEmail = email.toLowerCase()

         const emailExist = await User.findOne({email : newEmail})
         if(emailExist){
            return next(new HttpError('Email already exist',422))
         }

         if(password.trim().length < 6){
            return next(new HttpError('Password should be at least 6 characters',422))
         }

         if(password != password2){
            return next(new HttpError('Password do not match',422))
         }


         const salt = await bcrypt.genSalt(10)
         const hashedPass = await bcrypt.hash(password,salt);
         const newUser = await User.create({name,email:newEmail,password : hashedPass})

         res.status(201).json(`New user ${newUser.email} registered.`)


    }catch(error){
        return next(new HttpError('User Registration failed',422))
    }
}





//  ========================== Login user
// POST : /api/users/login
// UNPROTECTED
const loginUser = async (req,res,next)=>{
    res.json("Login User")
}







//  ========================== User Profile
// POST : /api/users/:id
// PROTECTED
const getUser = async (req,res,next)=>{
    res.json("User Profile")
}







//  ========================== Edit User
// POST : /api/users/edit-user
// PROTECTED
const editUser = async (req,res,next)=>{
    res.json("Edit User details")
}








//  ========================== Get All Authors
// POST : /api/users/authors
// UNPROTECTED
const getAuthors = async (req,res,next)=>{
    res.json("Get all authors/users")
}







//  ========================== Change Avatar 
// POST : /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req,res,next)=>{
    res.json("Change User Avatar")
}





module.exports = {registerUser,loginUser,changeAvatar,getUser,getAuthors,editUser}