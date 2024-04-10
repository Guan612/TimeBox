const {userFormateError,userInfoError,userAlreadyExited} = require('../constant/erro.type')
const {findUser} = require('../service/user.service')
//验证必填项目
const userValidator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            const {errors} = err
            //console.log(errors)
            const fields = errors.map(item => item.field);
            //将err加入userInfoError的res
            userInfoError.result = fields
            return ctx.app.emit('error', userInfoError, ctx)
        }

        await next();
    }
}

//用户是否存在验证
const userExistValidator = async (ctx, next) => {
    const {loginid} = ctx.request.body;
    const res = await findUser(loginid)
    //console.log(res)
    if (res) {
        return ctx.app.emit('error', userAlreadyExited, ctx)
    }

    await next();
}

//密码加密

module.exports = {
    userValidator,
    userExistValidator,
}