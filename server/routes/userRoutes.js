const {Router} = require('express')

const router = Router()


router.get('/',(req,res,next)=>{
    res.json('This is a user route')
})

module.exports = router