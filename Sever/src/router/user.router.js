const Router = require('@koa/router');
const router = new Router();

const {login,register} = require('../controller/user.controller')

router.post('/login',login)

router.post('/register',register)

module.exports = router;
