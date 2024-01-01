const Post = require('../models/postModel')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
const path = require('path')
const {v4 : uuid} = require('uuid')
const fs = require('fs')


// ========================== Create Post
// POST : api/posts
// Protected

const createPost = async (req,res,next)=>{
    try{
        let {title,category,description} = req.body
        if(!title || !category || !description || !req.files){
            return next(new HttpError('Fill in all fields and choose thumbnail',422))
        }
        const {thumbnail} = req.files
        // Check file size
        if(thumbnail.size > 2000000){
            return next(new HttpError("Thumbnail too big.Shoud be less than 2mb",422))
        }

        let fileName = thumbnail.name
        let splittedName = fileName.split('.')
        let newFileName = splittedName[0] + uuid() + '.' + splittedName[splittedName.length-1]
        thumbnail.mv(path.join(__dirname,'..','/uploads',newFileName),async (err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                const newPost = await Post.create({title,category,description,thumbnail : newFileName,creator : req.user.id})
                if(!newPost){
                    return next(new HttpError("Post couldn't created",422))
                }
                // Find user to update user's post
            const currentUser = await User.findById(req.user.id)
            const userPosts = currentUser.posts + 1
            await User.findByIdAndUpdate(req.user.id,{posts : userPosts})

            res.status(201).json(newPost)

            }
            
        })

    }
    catch(err){
        return next(new HttpError(err))
    }
}


// ========================== Get All Posts
// Get : api/posts
// Unprotected

const getAllPosts = async (req,res,next)=>{
    res.json("Get All Posts")
}


// ========================== Get Single Post
// Get : api/posts/:id
// Unprotected

const getPost = async (req,res,next)=>{
    res.json("Get Post")
}



// ========================== Get Posts By Category
// GET : api/posts/categories/:category 
// Unprotected

const getCatPosts = async (req,res,next)=>{
    res.json("Get posts by category")
}



// ========================== Get Author Post
// GET : api/posts/users/:id
// Unprotected

const getUserPosts = async (req,res,next)=>{
    res.json("Get User Posts")
}



// ========================== Edit Post
// PATCH : api/posts/:id
// Protected

const editPost = async (req,res,next)=>{
    res.json("Edit Post")
}



// ========================== Create Post
// Delete : api/posts/:id
// Protected

const deletePost = async (req,res,next)=>{
    res.json("Delete Post")
}



module.exports = {deletePost,editPost,getCatPosts,getUserPosts,getPost,getAllPosts,createPost}