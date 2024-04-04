const Rouret = require('@koa/router')
const router = new Rouret()
const userRouter = require('./user.router')
const photoRouter = require('./photo.router')

//挂载用户路由
router.use('/users', userRouter.routes())
router.use('/photos', photoRouter.routes())


module.exports = router