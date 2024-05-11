const prisma = require('../db/prisma')

class photoService {
    //首页照片合集流
    async getAll(pageinfo) {
        const { page, limit } = pageinfo;
        const res = await prisma.photoCollectionInfo.findMany({
            where: {
                isDel: false
            }
        })

        return res;
    }

    //获取照片详细信息流
    async getDetailed(id) {
        const res = await prisma.photoCollectionInfo.findUnique({
            where: {
                id: id,
                isDel: false
            },
            select: {
                id: true,
                userId: true,
                photoUrl: true,
                photoName: true,
                photoDes: true,
                photoAndColl: {
                    where: {
                        isDel: false
                    },
                    select: {
                        id: true,
                        photoCollectionId: true,
                        photoId: true,
                        photo: {
                            where: {
                                isDel: false
                            },
                            select: {
                                id: true,
                                photoUrl: true,
                                userId: true,
                            }
                        }
                    }
                }
            }
        });

        //console.log(res);

        //map函数用于重整数组结果,filter排除photos是null的情况
        const photos = res.photoAndColl.filter(item => item.photo !== null).map(item => ({
            id: item.photo.id,
            userid: item.photo.userId,
            photoUrl: item.photo.photoUrl
        }));

        const result = {
            photoName: res.photoName,
            photoDes: res.photoDes,
            photoslist: photos,
        };

        return result;
    }

    //添加照片集信息
    async add(photoInfo) {
        const res = await prisma.photoCollectionInfo.create({
            data: {
                photoName: photoInfo.photoName,
                photoDes: photoInfo.photoDes,
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
            data: {
                isDel: true
            }
        })
    }

    //修改照片集信息
    async update(photoInfo) {
        const res = await prisma.photoCollectionInfo.update({
            where: {
                id: photoInfo.id * 1
            },
            data: {
                photoName: photoInfo.photoName,
                photoDes: photoInfo.photoDes,
            }
        })

        return res;
    }

    //添加照片到照片集
    async addPhotoToCl(photoInfo) {
        const res = await prisma.photosAndPhotoColl.create({
            data: {
                photoId: photoInfo.photoId * 1,
                photoCollectionId: photoInfo.photoCollectionId * 1,
            }
        })

        return res;
    }

    //删除照片集里的照片
    async deleteClPhoto(photoId) {
        const res = await prisma.photosAndPhotoColl.update({
            where: {
                id: photoId
            },
            data: {
                isDel: true
            },
            select: {
                photoId: true,
                photoCollectionId: true,
            }
        })

        return res;
    }

    //搜索照片合集
    async search(keyword) {
        const res = await prisma.photoCollectionInfo.findMany({
            where: {
                photoName: {
                    contains: keyword
                },
                isDel: false,
            },
            // select:{
            //     photoName: true,
            //     photoDes: true,
            //     photoUrl: true,
            // }
        })
        return res;
    }

    //添加照片
    async addPhoto(photoInfo) {
        const res = await prisma.photosList.create({
            data: {
                userId: photoInfo.id,
                photoUrl: photoInfo.filepath,
                //photoShootTime: photoInfo.photoShootTime,
                //photoCollectionId: photoInfo.photoCollectionId * 1,
            }
        })
        return res
    }

    //删除照片
    async deletePhoto(photoId) {
        const res = await prisma.photosList.update({
            where: {
                id: photoId
            },
            data: {
                isDel: true
            }
        })

        return res
    }

    //查找照片上传人信息
    async UserColl(collId) {
        const res = await prisma.photosAndPhotoColl.findMany({
            where: {
                photoCollectionId: collId
            },
            select: {
                photo: {
                    select: {
                        userId: true,
                        user: {
                            select: {
                                nickname: true,
                            }
                        }
                    },
                }
            }
        });

        const pUUser = res.map(item => ({
            userId: item.photo.userId,
            nickname: item.photo.user.nickname
        }))

        //结果去重
        // const uniqueResults = Array.from(new Set(photoUplaodUser.map(item => JSON.stringify(item))))
        //     .map(item => JSON.parse(item));

        //使用 map 方法对原始数组进行转换，将每个对象转换为字符串形式。这可以通过 JSON.stringify(item) 来实现，其中 item 是数组中的每个对象。
        const stringifiedArray = pUUser.map(item => JSON.stringify(item));
        //使用 Set 去除重复项
        const uniqueStringSet = new Set(stringifiedArray);
        //将 Set 转回数组形式：
        const uniqueStringArray = Array.from(uniqueStringSet);
        //将数组中的字符串转换回对象形式：
        const uniqueResults = uniqueStringArray.map(item => JSON.parse(item));

        return uniqueResults;
    }

    //查找本人上传照片
    async UserPhoto(userId) {
        const res = await prisma.photosList.findMany({
            where: {
                userId: userId,
                isDel: false
            },
            select: {
                id: true,
                photoUrl: true,
                photoAndColl: {
                    where:{
                        isDel: false
                    },
                    select: {
                        photoCollectionId: true,
                        photoCollection: {
                            where: {
                                isDel: false
                            },
                            select: {
                                photoName: true,
                                photoDes: true,
                            }
                        }
                    }
                }
            }
        })

        // const reslut = res.map(item => ({
        //     id: item.id,
        //     photoUrl: item.photoUrl,
        //     // 注意这里取数组第一个元素的属性
        //     //photoCollectionId: item.photoAndColl[0].photoCollectionId
        // }))

        return res;
    }

    //查询用户创建的照片集
    async UserCollList(userId) {
        const res = await prisma.photoCollectionInfo.findMany({
            where: {
                userId: userId,
                isDel: false
            },
            select: {
                id: true,
                photoName: true,
                photoDes: true,
                photoUrl: true
            }
        })

        return res;
    }
}

module.exports = new photoService();