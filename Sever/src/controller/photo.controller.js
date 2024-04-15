const { 
    getAll, 
    getDetailed, 
    add,
    update,
    addPhoto,
    deleteCl,
} = require('../service/photo.service')
const { BASE_IMG_URL } = require('../config/config')
const { unSupportedFileType, uploadFileError } = require('../constant/erro.type')

class photoController {
    //获取所有照片
    async getAllPhoto(ctx) {
        const { page, limit } = ctx.request.query;
        const res = await getAll({ page, limit });
        ctx.body = {
            code: 0,
            msg: '获取照片成功',
            reslut: res
        }
    }

    //获取照片合集详细信息
    async getDetailedColl(ctx) {
        const { id } = ctx.request.params;
        const res = await getDetailed(id * 1);
        ctx.body = {
            code: 0,
            msg: '获取照片详细信息成功',
            reslut: res
        }
    }

    //添加照片集
    async addPhotoColl(ctx) {
        const { id } = ctx.state.user;
        const { photoName, photoDes } = ctx.request.body;
        const res = await add({ photoName, photoDes, id });
        ctx.body = {
            code: 0,
            msg: '添加照片集成功',
            reslut: res
        }
    }

    //修改照片集信息
    async updatePhotoColl(ctx) {
        const res = ctx.request.body;
        const { id } = ctx.request.params;
        const reslut = await update({ id, ...res });
        ctx.body = {
            code: 0,
            msg: '修改照片集信息成功',
            reslut: reslut
        }
    }

    //删除照片信息
    async delPhotoColl(ctx) {
        const { id } = ctx.request.params;
        const res = await deleteCl(id*1);
        ctx.body = {
            code: 0,
            msg: '删除照片信息成功',
            reslut: res
        }
    }

    //上传照片
    async uploadPhoto(ctx) {
        const { file, path } = ctx.request.files;
        let fileSize = file.size / 1024 / 1024;
        fileSize = fileSize.toFixed(2);

        const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }
            //将path写入数据库
            const { id } = ctx.state.user
            const {photoCollectionId} = ctx.request.body
            const filepath = BASE_IMG_URL + file.newFilename
            const res = await addPhoto({ id, photoCollectionId,filepath})
            ctx.body = {
                code: 0,
                Message: '图片上传成功',
                result: {
                    photo_name: file.newFilename,
                    photo_size: fileSize + "MB",
                }
            }

        } else {
            return ctx.app.emit('error', uploadFileError, ctx);
        }
    }
}

module.exports = new photoController();