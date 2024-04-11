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

    //更新昵称
    async updateNick(userInfo){
        const res = await prisma.user.update({
            where:{
                loginid:userInfo.loginid
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
                loginid:userInfo.loginid
            },
            data:{
                password:userInfo.newpassword
            }
        })
        return res
    }

}

module.exports = new userService()