const fs = require('fs');
const ExifReader = require('exifreader');
const {
    getAll,
    getDetailed,
    add,
    update,
    addPhoto,
    addPhotoToCl,
    deleteCl,
    deletePhoto,
    deleteClPhoto,
    search,
    UserColl,
    UserPhoto,
    UserCollList,
} = require('../service/photo.service')
const { BASE_IMG_URL } = require('../config/config')
const { unSupportedFileType, uploadFileError } = require('../constant/erro.type')

class photoController {
    //获取所有照片集
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

    //删除照片集信息
    async delPhotoColl(ctx) {
        const { id } = ctx.request.params;
        const res = await deleteCl(id * 1);
        ctx.body = {
            code: 0,
            msg: '删除照片信息成功',
            reslut: res
        }
    }
    //添加照片集里面的照片
    async addPhotoCollPhoto(ctx) {
        const { photoId, photoCollectionId } = ctx.request.body;
        //console.log(photoId, photoCollectionId);
        const res = await addPhotoToCl({photoId, photoCollectionId});
        ctx.body = {
            code: 0,
            msg: '添加照片集里面的照片成功',
            reslut: {
                photoId: res.photoId,
                photoCollectionId: res.photoCollectionId
            }
        }
    }

    //删除照片集里面的照片
    async delPhotoCollPhoto(ctx) {
        const { id } = ctx.request.params;
        const res = await deleteClPhoto(id * 1);
        ctx.body = {
            code: 0,
            msg: '删除照片集里面的照片成功',
            reslut: res
        }
    }

    //删除照片
    async delPhoto(ctx) {
        const { id } = ctx.request.params;
        const res = await deletePhoto(id * 1);
        ctx.body = {
            code: 0,
            msg: '删除照片成功',
            reslut: {
                id: res.id,
                isDel: res.isDel
            }
        }
    }

    //单/多文件上传
    async uploadPhoto(ctx) {
        const files = ctx.request.files.file;
        //console.log(files);
        const { photoCollectionId } = ctx.request.body;
        const { id } = ctx.state.user;
        const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        if (!files) {
            return ctx.app.emit('error', uploadFileError, ctx);
        }

        // 处理单文件上传情况
        let fileArray = Array.isArray(files) ? files : [files];

        const photoInfos = [];

        for (const file of fileArray) {
            //console.log(file);
            const { mimetype, newFilename, originalFilename, filepath, size } = file;

            if (!fileTypes.includes(mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }

            const fileSize = (size / 1024 / 1024).toFixed(2);

            //console.log('Uploaded Files:', ctx.request.files);
            // console.log('File Path:', path);
            // const buffer = fs.readFileSync(path);
            //读取 EXIF 信息
            let shoottime = null;
            let make = null;
            let model = null;
            try {
                const buffer = fs.readFileSync(filepath); // 读取文件的二进制数据
                const tags = ExifReader.load(buffer);
                //console.log('tags:', tags);
                if (tags && tags['DateTimeOriginal']) {
                    shoottime = tags['DateTimeOriginal'].description;
                    make = tags['Make'].description;
                    model = tags['Model'].description;
                    //console.log('shoottime:', shoottime);
                }
            } catch (error) {
                console.error('Error reading EXIF:', error);
            }

            const photoInfo = {
                id,
                photoShootTime:shoottime,
                photoMake:make,
                photoModel:model,
                filepath: BASE_IMG_URL + newFilename,
                originalFilename,
                fileSize: `${fileSize} MB`
            };

            photoInfos.push(photoInfo);
        }

        // 将所有文件信息插入数据库
        //console.log(photoInfos);
        const insertPromises = photoInfos.map(photoInfo => addPhoto(photoInfo));

        //确保所有文件信息都插入数据库后再返回响应
        await Promise.all(insertPromises);
        //console.log(insertPromises)

        ctx.body = {
            code: 0,
            message: '图片上传成功',
            result: photoInfos.map(photoInfo => ({
                photo_name: photoInfo.originalFilename,
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

    //我的照片筛选
    async filterMyPhoto(ctx) {
        const {time,make,model} = ctx.request.body;
        console.log(ctx.request.body)
        ctx.body = {
            code: 0,
            msg: '测试成功',
            reslut: {
                time,
                make,
                model
            }
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

    async test(ctx) {
        ctx.body = {
            code: 0,
            msg: '测试成功',
            reslut: 'test'
        }
    }
}

module.exports = new photoController();