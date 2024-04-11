const brypt = require('bcryptjs')

const {
    userFormateError,
    userInfoError,
    userAlreadyExited,
    userDoesNotExist,
    invalidPassword,
    oldPasswordError
} = require('../constant/erro.type')
const {findUser,findUserById} = require('../service/user.service')
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
const bcryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body;
    if (password) {
        const salt = brypt.genSaltSync(10);
        // hash保存的是 密文
        const hash = brypt.hashSync(password, salt);
        ctx.request.body.password = hash;
    }

    await next();
}

//验证登录
const verifyLogin = async (ctx, next) => {
    const {loginid, password} = ctx.request.body;
    const res = await findUser(loginid)
    if (!res) {
        return ctx.app.emit('error', userDoesNotExist, ctx)
    } else {
        const isValid = brypt.compareSync(password, res.password);
        //console.log(isValid)
        if (!isValid) {
            return ctx.app.emit('error', invalidPassword, ctx)
        }
    }

    await next();
}

//验证旧密码并加密新密码
const verifyOldPassword = async (ctx, next) => {
    const {oldpassword, newpassword} = ctx.request.body;
    const res = await findUserById(ctx.state.user.id)
    const isValid = brypt.compareSync(oldpassword, res.password);
    if (!isValid) {
        return ctx.app.emit('error', oldPasswordError, ctx)
    } else {
        const salt = brypt.genSaltSync(10);
        // hash保存的是 密文
        const hash = brypt.hashSync(newpassword, salt);
        ctx.request.body.newpassword = hash;
    }

    await next();
}

module.exports = {
    userValidator,
    userExistValidator,
    bcryptPassword,
    verifyLogin,
    verifyOldPassword,
}