const jwt = require('jsonwebtoken')
const { JWT_SECRET, BASE_IMG_URL} = require('../config/config')
const {
    create,
    findUser,
    updateNick,
    updatePassword,
    createHdImg
} = require('../service/user.service')

const { userInfoError } = require('../constant/erro.type')
class userController {
    //用户注册
    async register(ctx, next) {
        const userInfo = ctx.request.body
        const res = await create(userInfo)
        //console.log(res)
        ctx.body = {
            code: 0,
            message: '注册成功',
            result: res
        }
    }

    //用户登录
    async login(ctx, next) {
        const { loginid } = ctx.request.body
        const { password, createdAt, updatedAt, ...res } = await findUser(loginid)
        ctx.body = {
            code: 0,
            message: '登录成功',
            result: {
                userInfo: res,
                userhaderimg: BASE_IMG_URL + res.userHaderImg[0].userHaderImgUrl,
                token: jwt.sign(res, JWT_SECRET, { expiresIn: '90d' }),
            }
        }
    }

    //更改用户密码
    async changePwd(ctx, next) {
        const { id } = ctx.state.user
        const { newpassword } = ctx.request.body
        const res = await updatePassword({ id, newpassword })
        ctx.body = {
            code: 0,
            message: '修改成功',
            result: ""
        }
    }

    //更改用户昵称
    async changeNickName(ctx, next) {
        const { id } = ctx.state.user
        const { nickname } = ctx.request.body
        const { password, createdAt, updatedAt, ...res } = await updateNick({ nickname, id })
        if (res) {
            ctx.body = {
                code: 0,
                message: '修改成功',
                result: res.nickname
            }
        }
    }

    //创建用户头像
    async createHaderImg(ctx, next) {
        const { file, path } = ctx.request.files;
        let fileSize = file.size / 1024 / 1024;
        fileSize = fileSize.toFixed(2);

        const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }
            //将path写入数据库
            const { id } = ctx.state.user
            const filepath = file.newFilename
            const res = await createHdImg({id, filepath})
            ctx.body = {
                code: 0,
                Message: '图片上传成功',
                result: {
                    photo_name: file.newFilename,
                    photo_size: fileSize + "MB",
                }
            }
            
        } else {
            return ctx.app.emit('error', uploadFileError, ctx);
        }
    }



    //test函数
    async test(ctx, next) {
        const userInfo = ctx.request.body
        console.log(userInfo)
        ctx.body = 'test'
    }
}

module.exports = new userController()