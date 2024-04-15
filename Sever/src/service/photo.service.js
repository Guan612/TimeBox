const prisma = require('../db/prisma')

class photoService {
    //首页照片合集流
    async getAll(pageinfo) {
        const { page, limit } = pageinfo;
        const res = await prisma.photoCollectionInfo.findMany({

        })

        return res;
    }

    async getDetailed(id) {
        const res = await prisma.photoCollectionInfo.findUnique({
            where: {
                id: id
            },
            include: {
                photoslist: {
                    select: {
                        id: true,
                        userId: true,
                        photoUrl: true,
                    }
                }
            }
        })

        return res;
    }

    //添加照片集信息
    async add(photoInfo) {
        const res = await prisma.photoCollectionInfo.create({
            data: {
                name: photoInfo.photoName,
                description: photoInfo.photoDes,
                userId: photoInfo.id,
            }
        })

        return res;
    }

    //删除照片集信息
    async deleteCl(photoCId) {
        const res = await prisma.photoCollectionInfo.update({
            where: {
                id: photoCId
            },
            data:{
                isDel: true
            }
        })
    }

    //修改照片集信息
    async update(photoInfo) {
        const res = await prisma.photoCollectionInfo.update({
            where: {
                id: photoInfo.id
            },
            data: {
                name: photoInfo.photoName,
                description: photoInfo.photoDes,
            }
        })
    }

    //添加照片
    async addPhoto(photoInfo) {
        const res = await prisma.photosList.create({
            data: {
                userId: photoInfo.id,
                photoUrl: photoInfo.photoUrl,
                photoCollectionId: photoInfo.photoCollectionId,
            }
        })
        return res
    }
}

module.exports = new photoService();