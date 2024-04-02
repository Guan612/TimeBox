class userService {
    //注册
    async create(userInfo){
        const {user_name,password} = userInfo
        console.log(user_name)
        return userInfo

    }
}

module.exports = new userService()