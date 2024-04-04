class userService {
    //注册
    async create(userInfo){
        const {user_name,password} = userInfo
        //console.log(user_name)
        return userInfo

    }

    //登录验证


    //更改密码
    async changePsd(userInfo){
        const {user_name,password} = userInfo
        return userInfo
    }
}

module.exports = new userService()