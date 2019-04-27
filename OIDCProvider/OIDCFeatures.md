# OIDC 三种流程

| 特性                           | 授权码流程 | 隐式流程 | 混合流程 |
| ------------------------------ | ---------- | -------- | -------- |
| 所有 token 全部从授权路由返回  | no         | yes      | no       |
| 所有 token 都从 token 路由返回 | yes        | no       | no       |
| token 不会暴露给前端           | yes        | no       | no       |
| 客户端可以被 AP 认证           | yes        | no       | yes      |
| 可以刷新 token                 | yes        | no       | yes      |
| 一次交互                       | no         | yes      | no       |
| 必须服务器-服务器通信          | yes        | no       | varies   |

# 不同 response_type 对应的授权流程

| "response_type" value | Flow                    |
| --------------------- | ----------------------- |
| code                  | Authorization Code Flow |
| id_token              | Implicit Flow           |
| id_token token        | Implicit Flow           |
| code id_token         | Hybrid Flow             |
| code token            | Hybrid Flow             |
| code id_token token   | Hybrid Flow             |

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#Authentication)

# scope 参数对应的用户信息

| scope 名称 | 对应信息                            |
| ---------- | ----------------------------------- |
| address    | address                             |
| email      | email，email_verified               |
| phone      | phone_number, phone_number_verified |
| profile    | birthdate，family_name，gender，given_name，locale，middle_name，name，nickname，picture，preferred_username，profile，updated_at，website，zoneinfo |

# 用户信息字段含义

| 字段名                | 翻译             |
| --------------------- | ---------------- |
| sub                   | 唯一标识         |
| openid                | openid           |
| name                  | 姓名             |
| given_name            | 名字             |
| family_name           | 姓氏             |
| middle_name           | 中间名           |
| nickname              | 昵称             |
| preferred_username    | 希望被称呼的名字 |
| profile               | 基础资料         |
| picture               | 头像             |
| website               | 网站链接         |
| email                 | 电子邮箱         |
| email_verified        | 认证邮箱         |
| gender                | 性别             |
| birthdate             | 生日             |
| zoneinfo              | 时区             |
| locale                | 区域             |
| phone_number          | 手机号           |
| phone_number_verified | 认证手机号       |
| address               | 地址             |
| formatted             | 详细地址         |
| street_address        | 街道地址         |
| locality              | 城市             |
| region                | 省               |
| postal_code           | 邮编             |
| country               | 国家             |
| updated_at            | 信息更新时间     |

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
