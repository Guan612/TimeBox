const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config')
const {
    create, 
    findUser, 
    updateNick,
    updatePassword
} = require('../service/user.service')

const {userInfoError} = require('../constant/erro.type')
class userController {
    //用户注册
    async register(ctx, next) {
        const userInfo = ctx.request.body
        const res = await create(userInfo)
        //console.log(res)
        ctx.body = {
            code: 0,
            message: '注册成功',
            result: res
        }
    }

    //用户登录
    async login(ctx, next) {
        const {loginid} = ctx.request.body
        const {password,createdAt,updatedAt,...res} = await findUser(loginid)
        ctx.body = {
            code: 0,
            message: '登录成功',
            result: {
                userInfo: res,
                token: jwt.sign(res, JWT_SECRET, {expiresIn: '90d'}),
            }
        }
    }

    //更改用户密码
    async changePwd(ctx, next) {
        const {loginid} = ctx.state.user
        const {newpassword} = ctx.request.body
        const res = await updatePassword({loginid,newpassword})
        ctx.body = {
            code: 0,
            message: '修改成功',
            result: ""
        }
    }

    //更改用户昵称
    async changeNickName(ctx, next) {
        const {loginid} = ctx.state.user
        const {nickname} = ctx.request.body
        const {password,createdAt,updatedAt,...res} = await updateNick({nickname,loginid})
        if(res){
            ctx.body = {
                code: 0,
                message: '修改成功',
                result: res.nickname
            }
        }
    }


    //test函数
    async test(ctx, next) {
        const userInfo = ctx.request.body
        console.log(userInfo)
        ctx.body = 'test'
    }
}

module.exports = new userController()