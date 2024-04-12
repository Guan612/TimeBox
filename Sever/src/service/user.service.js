const prisma = require('../db/prisma')

class userService {
    //注册用户
    async create(userInfo){
        const res = await prisma.user.create({
            data:userInfo,
            select:{
                id:true,
                loginid:true,
                nickname:true,
            }
        })

        return res
    }

    //验证是否已经注册
    async findUser(loginid){
        const res = await prisma.user.findUnique({
            where:{
                loginid:loginid
            }
        })
        return res
    }

    //通过id找用户
    async findUserById(id){
        const res = await prisma.user.findUnique({
            where:{
                id:id
            },
        })
        return res
    }

    //更新昵称
    async updateNick(userInfo){
        const res = await prisma.user.update({
            where:{
                id:userInfo.id
            },
            data:{
                nickname:userInfo.nickname
            }
        })

        return res
    }

    //更改密码
    async updatePassword(userInfo){
        const res = await prisma.user.update({
            where:{
                id:userInfo.id
            },
            data:{
                password:userInfo.newpassword
            }
        })
        return res
    }


    //创建头像信息
    async createHdImg(userInfo){
        const res = await prisma.userHaderImg.create({
            data:{
                userId:userInfo.id,
                userHaderImgUrl:userInfo.filepath
            }
        })
        return res
    }

    //查找头像信息
    async findHdImg(userInfo){
        const res = await prisma.userHaderImg.findUnique({
            where:{
                userId:userInfo.id
            }
        })
        return res
    }

}

module.exports = new userService()