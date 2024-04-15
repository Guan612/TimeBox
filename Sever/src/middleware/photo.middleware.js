const {createPhotoCardError} = require('../constant/erro.type')
const photoValidator = (rules) => {
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
            return ctx.app.emit('error', createPhotoCardError, ctx)
        }

        await next();
    }
}

module.exports = {
    photoValidator
}