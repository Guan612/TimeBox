const {getAll} = require('../service/photo.service')
class photoController {
    //获取所有照片
    async getAllPhoto(ctx) {
        const {page,limit} = ctx.request.query;
        const res = await getAll({page,limit});
        ctx.body = {
            code: 0,
            msg: '获取照片成功',
            reslut: res
        }
    }
}

module.exports = new photoController();