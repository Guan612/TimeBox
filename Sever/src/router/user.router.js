const Router = require('@koa/router');
const router = new Router();

const {
    login,
    register,
    changePwd,
    changeNickName,
    createHaderImg,
    findHanderImg,
    test
} = require('../controller/user.controller')

const {
    userValidator,
    userExistValidator,
    bcryptPassword,
    verifyLogin,
    verifyOldPassword,
} = require('../middleware/user.middleware')

const {auth} = require('../middleware/auth.middleware')

//登录
router.post('/login', userValidator({
    loginid: "string",
    password: "string",
}), verifyLogin, login)

//注册
router.post('/register', userValidator({
    loginid: "string",
    password: "string",
    email:{type:"email",required:false},
    nickname:{type:"string",required:false},
    phone:{type:"string",required:false},
}), userExistValidator, bcryptPassword, register)

//更改密码
router.put('/changepwd', auth, userValidator({
    oldpassword: "string",
    newpassword: "string",
}),verifyOldPassword, changePwd)

//更改昵称
router.put('/changenickname', auth, userValidator({
    nickname: "string",
}), changeNickName)

//上传头像
router.post('/uploadHaderImg', auth, createHaderImg)

//查找头像
router.get('/getHaderImg', auth, findHanderImg)


//测试
router.post('/test', auth, userValidator({
    oldpassword: "string",
    newpassword: "string",
}),verifyOldPassword, test)

module.exports = router;
