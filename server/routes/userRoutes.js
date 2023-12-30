const {Router} = require('express')
const {registerUser,loginUser,changeAvatar,getUser,getAuthors,editUser} = require('../controllers/userController')
const router = Router()
const authMiddleware = require('../middleware/authMiddleware.js')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUser)
router.get('/',getAuthors)
router.post('/change-avatar',authMiddleware,changeAvatar)
router.patch('/edit-profile',authMiddleware,editUser)




module.exports =router