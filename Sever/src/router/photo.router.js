const Router = require('@koa/router');
const router = new Router();
const { getAllPhoto } = require('../controller/photo.controller');

router.get('/',getAllPhoto)

module.exports = router;