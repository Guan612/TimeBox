const {create} = require('../service/user.service')
class userController {
    //用户注册
    async register(ctx, next) {
        const userInfo = ctx.request.body
        const res = await create(userInfo)
        ctx.body = {
            code: 0,
            message: '注册成功',
            result: res
        }
    }

    //用户登录
    async login(ctx, next) {
        ctx.body = 'login'
    }

    //更改用户密码
    async changePwd(ctx, next) {
        const {userID,old_password,new_password} = ctx.request.body
        const res = await updatePwd({user_name,old_password,new_password})
        ctx.body = 'changePassword'
    }

    //更改用户昵称
    async changeNickName(ctx, next) {
        const {userID,nick_name} = ctx.request.body
        const res = await updateNickName({user_name,nick_name})
        ctx.body = 'changeNickName'
    }


    //test函数
    async test(ctx, next) {
        const userInfo = ctx.request.body
        console.log(userInfo)
        ctx.body = 'test'
    }
}

module.exports = new userController()