# api接口说明

## 1. 用户相关
一级路由：/users

### 1.1 注册
方法：POST
url：/register
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |
| loginid | string | 是 | 登录id |
| ncikname | string | 否 | 用户名 |
| password | string | 是 | 密码 |
| email | string | 否 | 邮箱 |


返回示例

```json
    {
        "code": 0,
        "message": "注册成功",
        "result": {
            "id": 2,
            "loginid": "canary",
            "nickname": "canary"
        }
    }
```

### 1.2 登录
方法：POST
url：/login
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| user_name | string | 是 | 用户名 | 
| password | string | 是 | 密码 |

返回示例

```json
    {
        "code": 0,
        "message": "登录成功",
        "result": {
            "userInfo": {
                "id": 2,
                "loginid": "canary",
                "nickname": "canary",
                "email": "canary@qq.com",
                "phones": null,
                "isDel": false
            },
            "token": "1234567890"
        }
    }
```


### 1.3 修改密码
方法：PUT
url：/changepwd
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| user_name | string | 是 | 用户名 | 
| old_password | string | 是 | 旧密码 | 
| new_password | string | 是 | 新密码 |

返回示例

```json
    {
        "code": 0,
        "msg": "修改密码成功",
        "reslut": ""
    }
```
### 1.4 修改用户昵称
方法：PUT
url：/changenickname
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |
| nickname | string | 是 | 新昵称 |

返回示例

```json
    {
        "code": 0,
        "msg": "修改用户昵称成功",
        "reslut": ""
    }
```

### 1.5 上传头像
方法：PUT
url：/gethaderimg
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| file | file | 是 | 头像文件 |

返回示例

```json
    {
        "code": 0,
        "msg": "上传头像成功",
        "result": {
            "photo_name": "b411c99464a54b08e60bf7200.jpg",
            "photo_size": "0.20MB"
        }
    }
```

### 1.6 获取用户头像
方法：GET
url：/gethaderimg
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |

返回示例

```json
    {
        "code": 0,
        "message": "查找成功",
        "result": "https://img2.imgtp.com/2024/04/09/OmWWam4c.jpg"
    }
```
### 1.7 获取用户信息
方法：GET
url：/:user_id
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| user_id | int | 是 | 用户id | 

返回示例

```json
    {
        "code": 0,
        "message": "查找成功",
        "result": {
            "id": 2,
            "loginid": "canary",
            "nickname": "canary",
            "email": "canary@qq.com",
            "phones": null,
            "isDel": false
        }
}
```

## 2. 照片相关
一级路由：/photos

### 2.1 获取照片列表
方法：GET
url：/
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| user_id | int | 是 | 用户id | 
| page | int | 否 | 页码 | 
| page_size | int | 否 | 每页数量 |

返回示例

```json
    {
        "code": 0, 
        "msg": "获取照片列表成功",
        "page": 1,
        "total": 10,
        "reslut": [
            {
                "photo_id": 1,
                "photo_name": "photo1",
                "photo_url": "http://xxxxxxx.jpg",
            },
            {
                ......
            }
        ]
    }
```

### 2.2 获取照片合集详细信息
方法：GET
url：/:photo_collection_id
参数：  

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| photo_collection_id | int | 是 | 照片合集id | 

返回示例    

```json
    {
        "code": 0,
        "msg": "获取照片详细信息成功",
        "result": {
            "collectionInfo": {
                "photo_collection_id": 1,
                "photo_name": "photo1",
                "photo_desc": "photo1 desc",
                "photo_shoot_time": "2020-01-01 00:00:00"
            },
            "photos": [
                {
                    "photo_id": 1,
                    "user_id": 1,
                    "photo_url": "http://xxxxxxx.jpg"
                },
                {
                    "photo_id": 2,
                    "user_id": 1,
                    "photo_url": "http://xxxxxxx.jpg"
                },
                {
                    "photo_id": 3,
                    "user_id": 2,
                    "photo_url": "http://xxxxxxx.jpg"
                }
            ]
        }     
    }
```

### 2.3 添加照片集
方法：POST
url：/
参数：

| 参数名 | 类型 | 是否必须 | 说明 | 
| :----: | :----: | :----: | :----: |    
| photo_name | string | 是 | 照片名称 |
| photo_url | string | 是 | 照片url |
| photo_desc | string | 否 | 照片描述 |
| isdelete | boolean | 否 | 是否删除 |

返回示例    

```json
    {
        "code": 0,
        "msg": "添加照片成功",
        "reslut": ""
    }
```

### 2.4 修改照片合集信息
方法：PUT
url：/:photo_id
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| photo_id | int | 是 | 照片id |
| photo_name | string | 否 | 照片名称 | 
| photo_url | string | 否 | 照片url |
| photo_desc | string | 否 | 照片描述 |
| photo_shoot_time | string | 否 | 照片拍摄时间 |

返回示例
```json
    {
        "code": 0,
        "msg": "更新照片成功",
        "reslut": {
            "photo_name": "photo1",
            "photo_desc": "photo1 desc",
        }
    }
```

### 2.5 删除照片合集
方法：DELETE
url：/:photo_id
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |
| photo_id | int | 是 | 照片id |

返回示例
```json
    {
        "code": 0,
        "msg": "删除照片成功",
        "reslut": ""
    }
```

### 2.6 添加照片
方法：POST
url：/uploads
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| photo_collection_id | int | 是 | 照片合集id |
| photo_name | string | 否 | 照片名称 |
| photo_url | string | 否 | 照片url |
| photo_desc | string | 否 | 照片描述 |
| photo_shoot_time | string | 否 | 照片拍摄时间 |

返回示例
```json
    {
        "code": 0,
        "msg": "添加照片成功",
        "reslut": ""
    }
```