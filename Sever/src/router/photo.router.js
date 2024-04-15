const Router = require('@koa/router');
const router = new Router();
const {
    getAllPhoto,
    getDetailedColl,
    addPhotoColl,
    updatePhotoColl,
    delPhotoColl,
    uploadPhoto
} = require('../controller/photo.controller');

const { auth } = require('../middleware/auth.middleware');
const { photoValidator } = require('../middleware/photo.middleware');

//获取照片列表
router.get('/', getAllPhoto)

//获取照片合集详细信息(photo_collection_id)
router.get('/:id', getDetailedColl)

//添加照片集
router.post('/', auth, photoValidator({
    photoName: 'string',
    photoDesc: { type: 'string', required: false },
    photoUrl: { type: 'string', required: false }
}), addPhotoColl)

//修改照片合集信息
router.put('/:id', auth, updatePhotoColl)

//删除照片合集
router.delete('/:id', auth, delPhotoColl)

//照片上传
router.post('/upload', auth, uploadPhoto)

module.exports = router;