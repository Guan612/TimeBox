const Router = require('@koa/router');
const router = new Router();
const { getAllPhoto, getDetailedColl } = require('../controller/photo.controller');

//获取照片列表
router.get('/', getAllPhoto)

//获取照片合集详细信息(photo_collection_id)
router.get('/:id', getDetailedColl)

//添加照片集
router.post('/')

//修改照片合集信息
router.put('/:id')

//删除照片合集
router.delete('/:id')

module.exports = router;