const {Router} = require('express')
const  {deletePost,editPost,getCatPosts,getUserPosts,getPost,getAllPosts,createPost} = require('../controllers/postController')
const router = Router()

router.get('/',getAllPosts)






module.exports =router