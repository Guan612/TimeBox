const prisma = require('../db/prisma')

class photoService {
    //首页照片合集流
    async getAll(pageinfo){
        const {page,limit} = pageinfo;
        const res = await prisma.photoCollectionInfo.findMany({

        })

        return res;
    }
}

module.exports = new photoService();