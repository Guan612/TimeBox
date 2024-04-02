# api接口说明

## 1. 用户相关
一级路由：/users

### 1.1 注册
方法：POST
url：/register
参数：

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |
| user_name | string | 是 | 用户名 | 
| password | string | 是 | 密码 |
| email | string | 否 | 邮箱 |


返回示例

```json
    {
        "code": 0,
        "msg": "注册成功",
        "reslut": {
            "user_name": "admin",
            "user_id": 1
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
        "msg": "登录成功",
        "reslut": {
            "user_name": "admin",
            "user_id": 1,
            "token":"xxxxxxxxxx"
        }
    }
```

### 1.3 修改密码
方法：POST
url：/change_password
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

### 2.2 获取照片详细信息
方法：GET
url：/:photo_id
参数：  

| 参数名 | 类型 | 是否必须 | 说明 |
| :----: | :----: | :----: | :----: |    
| photo_id | int | 是 | 照片id | 

返回示例    

```json
    {
        "code": 0,
        "msg": "获取照片详细信息成功",
        "reslut": {
            "photo_id": 1,
            "photo_name": "photo1", 
            "photo_url": "http://xxxxxxx.jpg",
            "photo_desc": "photo1 desc",
            "photo_shoot_time": "2020-01-01 00:00:00",
        }
    }
```

### 2.3 添加照片
方法：POST
url：/
参数：

| 参数名 | 类型 | 是否必须 | 说明 | 
| :----: | :----: | :----: | :----: |    
| photo_name | string | 是 | 照片名称 |
| photo_url | string | 是 | 照片url |
| photo_desc | string | 否 | 照片描述 |
| isdelete | boolean | 否 | 是否删除 |
| photo_shoot_time | string | 否 | 照片拍摄时间 |

返回示例    

```json
    {
        "code": 0,
        "msg": "添加照片成功",
        "reslut": ""
    }
```

### 2.4 修改照片
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

### 2.5 删除照片
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