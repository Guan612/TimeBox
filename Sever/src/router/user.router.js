const Router = require('@koa/router');
const router = new Router();

const {login,register,changePwd,changeNickName} = require('../controller/user.controller')

//登录
router.post('/login',login)

//注册
router.post('/register',register)

//更改密码
router.put('/changepwd',changePwd)

//更改昵称
router.put('/changenickname',changeNickName)

module.exports = router;
