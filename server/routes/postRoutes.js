const {Router} = require('express')
const  {deletePost,editPost,getCatPosts,getUserPosts,getPost,getAllPosts,createPost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware.js')

const router = Router()

router.get('/',getAllPosts)
router.get('/:id',getPost)
router.get('/users/:id',getUserPosts)
router.get('/categories/:category',getCatPosts)
router.post('/',authMiddleware,createPost)
router.delete('/:id',authMiddleware,deletePost)
router.patch('/:id',authMiddleware,editPost)







module.exports =router