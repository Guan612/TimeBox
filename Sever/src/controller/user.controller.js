const {create} = require('../service/user.service')
class userController {
    //用户注册
    async register(ctx, next) {
        const {user_name, password, email} = ctx.request.body
        const res = await create({user_name, password, email})
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

    async changePassword(ctx, next) {
        ctx.body = 'changePassword'
    }
}

module.exports = new userController()