const Router = require('@koa/router');
const router = new Router();

const {
    login,
    register,
    changePwd,
    changeNickName,
    test
} = require('../controller/user.controller')

const {
    userValidator,
    userExistValidator,
    bcryptPassword,
    verifyLogin,
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
router.put('/changepwd',changePwd)

//更改昵称
router.put('/changenickname', auth, userValidator({
    nickname: "string",
}), changeNickName)



//测试
router.post('/test', userValidator({
    loginid: "string",
    password: "string",
    email:{type:"email",required:false},
    nickname:{type:"string",required:false},
    phone:{type:"string",required:false},
}),userExistValidator, test)

module.exports = router;
