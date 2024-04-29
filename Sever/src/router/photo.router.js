const Router = require('@koa/router');
const router = new Router();
const {
    getAllPhoto,
    searchPhoto,
    getDetailedColl,
    addPhotoColl,
    updatePhotoColl,
    delPhotoColl,
    uploadPhoto,
    findPhotoCollUser,
    showMyPhoto,
    showMyPhotoColl,
    delPhotoCollPhoto,
    delPhoto,

    test,
} = require('../controller/photo.controller');

const { auth } = require('../middleware/auth.middleware');
const { photoValidator } = require('../middleware/photo.middleware');

//获取照片列表
router.get('/', getAllPhoto)

//照片集搜索
router.get('/search', auth, searchPhoto)

//查找我的照片(注意路由匹配顺序)
router.get('/myphoto', auth, showMyPhoto)

//获取我的照片集列表
router.get('/mycoll', auth, showMyPhotoColl)

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

//删除照片集里面的照片
router.delete('/clphoto/:id', auth, delPhotoCollPhoto)

//删除照片合集
router.delete('/:id', auth, delPhotoColl)

//删除照片
router.delete('/photo/:id', auth, delPhoto)

//照片上传
router.post('/upload', auth, uploadPhoto)

//查找照片集照片所属人
router.get('/:id/owner', auth, findPhotoCollUser)

module.exports = router;