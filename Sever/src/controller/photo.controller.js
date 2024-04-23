const {
    getAll,
    getDetailed,
    add,
    update,
    addPhoto,
    deleteCl,
    search,
    UserColl,
    UserPhoto,
    UserCollList
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
        const res = await deleteCl(id * 1);
        ctx.body = {
            code: 0,
            msg: '删除照片信息成功',
            reslut: res
        }
    }

    //上传照片
    // async uploadPhoto(ctx) {
    //     const { file, path } = ctx.request.files;
    //     let fileSize = file.size / 1024 / 1024;
    //     fileSize = fileSize.toFixed(2);

    //     const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    //     if (file) {
    //         if (!fileTypes.includes(file.mimetype)) {
    //             return ctx.app.emit('error', unSupportedFileType, ctx);
    //         }
    //         //将path写入数据库
    //         const { id } = ctx.state.user
    //         const { photoCollectionId } = ctx.request.body
    //         const filepath = BASE_IMG_URL + file.newFilename
    //         const res = await addPhoto({ id, photoCollectionId, filepath })
    //         ctx.body = {
    //             code: 0,
    //             Message: '图片上传成功',
    //             result: {
    //                 photo_name: file.newFilename,
    //                 photo_size: fileSize + "MB",
    //             }
    //         }

    //     } else {
    //         return ctx.app.emit('error', uploadFileError, ctx);
    //     }
    // }

    //单/多文件上传测试
    async uploadPhoto(ctx) {
        const files = ctx.request.files.files;
        const { photoCollectionId } = ctx.request.body;
        const { id } = ctx.state.user;
        const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
        // if (!files) {
        //     return ctx.app.emit('error', uploadFileError, ctx);
        // }
    
        // 处理单文件上传情况
        let fileArray = Array.isArray(files) ? files : [files];
    
        const photoInfos = [];
    
        for (const file of fileArray) {
            const { mimetype, filename, path, size } = file;
    
            // if (!fileTypes.includes(mimetype)) {
            //     return ctx.app.emit('error', unSupportedFileType, ctx);
            // }
    
            const fileSize = (size / 1024 / 1024).toFixed(2);
    
            const photoInfo = {
                id,
                photoCollectionId,
                filepath: BASE_IMG_URL + filename,
                filename,
                fileSize: `${fileSize} MB`
            };
    
            photoInfos.push(photoInfo);
        }
    
        // 将所有文件信息插入数据库
        const insertPromises = photoInfos.map(photoInfo => addPhoto(photoInfo));
        await Promise.all(insertPromises);
    
        ctx.body = {
            code: 0,
            message: '图片上传成功',
            result: photoInfos.map(photoInfo => ({
                photo_name: photoInfo.filename,
                photo_size: photoInfo.fileSize
            }))
        };
    }

    //照片搜索
    async searchPhoto(ctx) {
        const { keyword } = ctx.request.query;
        const res = await search(keyword);
        ctx.body = {
            code: 0,
            msg: '搜索照片成功',
            reslut: res
        }
    }

    //查找照片集照片属于人
    async findPhotoCollUser(ctx) {
        const { id } = ctx.request.params;
        const res = await UserColl(id * 1);
        ctx.body = {
            code: 0,
            msg: '查找照片集照片属于人成功',
            reslut: res
        }
    }

    //我的照片显示
    async showMyPhoto(ctx) {
        const { id } = ctx.state.user;
        const res = await UserPhoto(id * 1);
        ctx.body = {
            code: 0,
            msg: '我的照片显示成功',
            reslut: res
        }
    }

    //我的照片集
    async showMyPhotoColl(ctx) {
        const { id } = ctx.state.user;
        const res = await UserCollList(id * 1);
        ctx.body = {
            code: 0,
            msg: '我的照片集显示成功',
            reslut: res
        }
    }




    async test(ctx) {
        ctx.body = {
            code: 0,
            msg: '测试成功',
            reslut: 'test'
        }
    }
}

module.exports = new photoController();