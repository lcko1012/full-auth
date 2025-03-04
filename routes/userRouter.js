const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register',userCtrl.register)
router.post('/activation',userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken, )
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset',auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)
//get all users with admin
router.get('/all_infor', auth ,authAdmin,userCtrl.getUsersAllInfor)

//log out
router.get("/logout", userCtrl.logout)

//update
router.patch('/update', auth, userCtrl.updateUser)

//update user permissions
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

//delete user
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

//Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router