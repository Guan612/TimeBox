const Rouret = require('@koa/router')
const router = new Rouret()
const userRouter = require('./user.router')

//挂载用户路由
router.use('/users', userRouter.routes())

module.exports = router