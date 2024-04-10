const prisma = require('../db/prisma')

class userService {
    //注册
    async create(userInfo){
        const res = await prisma.user.create({
            data:userInfo
        })

        return res
    }

    //登录验证
    async login(userInfo){
        
    }

    //更改密码
    async updatePsd(userInfo){
        const {user_name,old_password,new_password} = userInfo;
        return userInfo
    }
}

module.exports = new userService()