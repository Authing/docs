---
meta:
  - name: description
    content: Python SDK
---

# {{$localeConfig.brandName}} - Python

<LastUpdated/>

{{$localeConfig.brandName}} Python SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于纯后端交互的服务器环境。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端服务器环境使用。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

> {{$localeConfig.brandName}} Python SDK 同时支持 `python2` 和 `python3`。


## GitHub 下载地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | Python 2.7 +                                |
| 仓库地址 | [https://github.com/Authing/authing-py-sdk](https://github.com/Authing/authing-py-sdk) |


## 安装

```
pip install authing
```

## 使用管理模块

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端服务器环境使用。


### 初始化

`ManagementClient` 初始化需要传入用户池 ID `userPoolId` 和用户池密钥 `secret`：

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次）。

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))
```

现在 `ManagementClient()` 实例就可以使用了。例如可以获取用户池中的用户列表：

```python
data = management_client.users.list()
```

返回的数据如下：

```json
{
  "totalCount": 1,
  "list": [
    {
      "id": "5f7ddfe62ba819802422362e",
      "arn": "arn:cn:authing:5f7a993eb9b49dcd5c021e40:user:5f7ddfe62ba819802422362e",
      "userPoolId": "5f7a993eb9b49dcd5c021e40",
      "username": "nhxcpzmklk",
      "email": null,
      "emailVerified": false,
      "phone": null,
      "phoneVerified": false,
      "unionid": null,
      "openid": null,
      "nickname": null,
      "registerSource": ["import:manual"],
      "photo": "https://usercontents.authing.cn/authing-avatar.png",
      "password": "a56f21e5659428f9b353be4ed667fc05",
      "oauth": null,
      "token": null,
      "tokenExpiredAt": null,
      "loginsCount": 0,
      "lastLogin": null,
      "lastIP": null,
      "signedUp": "2020-10-07T23:33:58+08:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": null,
      "name": null,
      "givenName": null,
      "familyName": null,
      "middleName": null,
      "profile": null,
      "preferredUsername": null,
      "website": null,
      "gender": "U",
      "birthdate": null,
      "zoneinfo": null,
      "locale": null,
      "address": null,
      "formatted": null,
      "streetAddress": null,
      "locality": null,
      "region": null,
      "postalCode": null,
      "country": null,
      "createdAt": "2020-10-07T23:33:58+08:00",
      "updatedAt": "2020-10-07T23:33:58+08:00"
    }
  ]
}
```

## 使用认证模块

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于纯后端交互的服务器环境。

### 初始化

初始化 `AuthenticationClient` 需要 `app_id`（应用 ID）和 `app_host`（应用端点，如 `https://YOUR_DOMAIN.authing.cn`）：

> 你可以在此[获取 app_id 和 app_host](/guides/faqs/get-app-id-and-secret.md)。

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn'
))
```

完整参数如下：

- `app_id`: {{$localeConfig.brandName}} [应用 ID](/guides/faqs/get-app-id-and-secret.md)（必填）；
- `app_host`: {{$localeConfig.brandName}} [应用地址](/guides/faqs/get-app-id-and-secret.md)（必填），格式为 `https://YOUR_DOMAIN.authing.cn`；
- `token`: 用户的 [id_token](/concepts/id-token.md)（可选），你可以在前端 localStorage 中缓存用户 `id_token`，然后使用 `id_token` 初始化 SDK，从而实现记住登录的目的；
- `timeout`: 请求超时时间（可选），位为毫秒，默认为 10000（10 秒）；
- `on_error`: 错误处理函数（可选），你可以用其来全局捕捉 {{$localeConfig.brandName}} 客户端请求的所有异常。完整的错误代码请见[此文档](/reference/error-code.md)。函数定义为：

```python
def on_error(code, message):
    raise AuthingException(code=code, errmsg=message)
```

- `enc_public_key`: 密码非对称加密公钥（可选），如果你使用的是 {{$localeConfig.brandName}} 公有云服务，可以忽略；如果你使用的是私有化部署的 {{$localeConfig.brandName}}，请联系 {{$localeConfig.brandName}} IDaaS 服务管理员。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 `zh-CN` 和 `en-US`，默认为 `zh-CN`。

### 快速开始

我们推荐每次请求初始化一个新的 `AuthenticationClient`，保证不同请求之间完全隔离。

```python
username = "bob"
password = "passw0rd"
user = authentication_client.login_by_username(
    username=username,
    password=password,
)
```

完成登录之后，`update_profile` 等要求用户登录的方法就可用了：

```python
authentication_client.update_profile({
  'nickname': 'Nick'
})
```

你也可以使用 `token` 参数来初始化 `AuthenticationClient`, 而不需要每次都调用 `login` 方法:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    token='ID_TOKEN'
))
```

再次执行 `update_profile` 方法，发现也成功了:

```python
user = authentication_client.update_profile({
  'nickname': 'Nick'
})
```

## 错误处理

如果函数执行失败会抛出异常，你需要使用 `try/except` 捕捉异常：

```python
from authing.v2.exceptions import AuthingException

try:
    authentication_client.login_by_username(
        username='bob',
        password='passw0rd',
    )
except AuthingException as e:
    print(e.code) # 2004
    print(e.message) # 用户不存在
```

> 完整的错误代码请见[此文档](/reference/error-code.md)。

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**）和密码加密公钥，如果你不清楚可以联系 Authing IDaaS 服务管理员。

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
    host="https://core.you-authing-service.com",
    enc_public_key="YOUR_PUBLIC_KEY"
))
```

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
