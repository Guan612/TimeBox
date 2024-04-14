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
                        userId: true,
                        photoUrl: true,
                    }
                }
            }
        })

        return res;
    }
}

module.exports = new photoService();