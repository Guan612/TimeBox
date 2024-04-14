const {getAll,getDetailed } = require('../service/photo.service')
const {BASE_IMG_URL} = require('../config/config')

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

    //获取照片合集详细信息
    async getDetailedColl(ctx){
        const {id} = ctx.request.params;
        const res = await getDetailed(id*1);
        ctx.body = {
            code: 0,
            msg: '获取照片详细信息成功',
            reslut: res
        }
    }

    //添加照片集
    async addPhotoColl(ctx){
        const {name,description,cover,userId} = ctx.request.body;
        const res = await addPhotoColl({name,description,cover,userId});
        ctx.body = {
            code: 0,
            msg: '添加照片集成功',
            reslut: res
        }
    }
}

module.exports = new photoController();