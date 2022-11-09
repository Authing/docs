---
meta:
  - name: description
    content: user 对象
---

# user 对象

<LastUpdated/>

user 对象中保存了当前用户的各种数据，以及用于添加自定义字段、自定义 token 字段的方法。

::: hint-info
Pre-Register（注册前） Pipeline 的 user 对象含有用户注册时填入的信息，但没有实际写入数据库。
:::

## 属性

| 属性名         | 值类型  | 说明                                          |
| -------------- | ------- | --------------------------------------------- |
| id             | string  | 用户 ID                                       |
| username       | string  | 用户名                                        |
| email          | string  | 邮箱                                          |
| emailVerified  | boolean | 邮箱是否已验证                                |
| phone          | string  | 手机号                                        |
| phoneVerified  | boolean | 手机号是否已验证                              |
| photo          | string  | 头像链接                                      |
| nickname       | string  | 昵称                                          |
| gender         | string  | 性别                                          |
| lastLogin      | string  | 上次登录时间，格式为 2020-02-07T04:29:40.877Z |
| company        | string  | 公司名                                        |
| browser        | string  | 访问浏览器                                    |
| device         | string  | 访问设备                                      |
| country        | string  | 国家                                          |
| region         | string  | 地区                                          |
| address        | string  | 地址                                          |

## 方法

| 方法名            | 说明                                                                                                              | 示例代码                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| addCustomData     | 添加用户自定义字段。你需要先在用户池级别定义好预设的用户自定义字段，才能在 Pipeline 中为用户设置。                | user.addCustomData("KEY", "VALUE") |
| addIdToken        | 设置 ID Token 自定义字段，也可以用于替换原有 ID Token 内容。**此接口仅在 OIDC ID Token 签发前可用。**             | user.addIdToken("KEY","VALUE")     |
| removeIdToken     | 删除 ID Token 原有或自定义字段。**此接口仅在 OIDC ID Token 签发前可用。**                                         | user.removeIdToken("KEY","VALUE")  |
| addAccessToken    | 设置 Access Token 自定义字段，也可以用于替换原有 Access Token 内容。**此接口仅在 OIDC Access Token 签发前可用。** | user.addAccessToken("KEY","VALUE") |
| removeAccessToken | 删除 Access Token 原有或自定义字段。**此接口仅在 OIDC Access Token 签发前可用。**                                 | user.removeAccessToken("KEY")      |
