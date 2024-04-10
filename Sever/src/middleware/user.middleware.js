const {userFormateError,userInfoError} = require('../constant/erro.type')

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

//注册用户是否存在验证
const userExistValidator = async (ctx, next) => {
    


    await next();
}

module.exports = {
    userValidator,
    userExistValidator
}