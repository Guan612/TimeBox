const prisma = require('../db/prisma')

class userService {
    //注册用户
    async create(userInfo){
        const res = await prisma.user.create({
            data:userInfo
        })

        return res
    }

    //验证是否已经注册
    async findUser(loginid){
        const res = await prisma.user.findUnique({
            select:{
                id:true
            },
            where:{
                loginid:loginid
            }
        })
        //console.log(res)
        return res
    }

    //更改密码
    async updatePsd(userInfo){
        const {user_name,old_password,new_password} = userInfo;
        return userInfo
    }
}

module.exports = new userService()