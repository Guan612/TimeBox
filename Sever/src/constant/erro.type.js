module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      },
      userAlreadyExited: {
        code: '10002',
        message: '用户已经存在',
        result: '',
      },
      userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: '',
      },
      userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        result: '',
      },
      userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: '',
      },
      invalidPassword: {
        code: '10006',
        message: '密码不匹配',
        result: '',
      },
      userInfoError: {
          code: '10007',
          message: '用户校验信息有误',
          result: '',
      },
      oldPasswordError:{
          code: '10008',
          message: '旧密码错误',
          result: '',
      },
      tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: '',
      },
      invalidToken: {
        code: '10102',
        message: '无效的token',
        result: '',
      },
      createPhotoCardError:{
        code: '10203',
        message: '创建照片合集信息错误',
      },
      uploadFileError:{
        code: '10300',
        message: '照片上传为空',
      }
}