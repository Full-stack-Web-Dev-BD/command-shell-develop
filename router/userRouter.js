const router=require('express').Router()
const userController=require('../controller/userController')



// testing the router is it working or not
router.get('/redirect',(req,res)=>{
    console.log('reouter redirected')
    res.redirect('/getuser')
})

router.get('/getUser',(req,res)=>{
    res.status(200).json({massage:'so fine'})
})
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('single-user/:id',userController.getSingleUser)

module.exports=router