# Python

本指南将从 Authing Python SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

```bash
pip install authing==5.0.0a6
```

> 如果你希望使用 V4 版本，请跳转到 [v4](https://github.com/Authing/authing-py-sdk/tree/v4) 分支查看文档。

## 认证你的用户

### 初始化

```python
from authing import AuthenticationClient

authentication_client = AuthenticationClient(
  app_id="AUTHING_APP_ID",
  app_secret="AUTHING_SECRET",
  host="AUTHING_DOMAIN",
  redirect_uri="AUTHING_REDIRECTURI",
)
```

完整的参数和释义如下：

- `appId`: 应用 ID（必填）。
- `appSecret`: 应用 Secret（必填）。
- `host`: 应用对应的用户池域名，例如 pool.authing.cn，最后不带 `/` （必填）。
- `redirectUri`: 认证完成后的重定向目标 URL（必填）。
- `logoutRedirectUri`: 登出完成后的重定向目标 URL（可选）。
- `scope`: 应用侧向 Authing 请求的权限（可选）。
- `serverJWKS`: 服务端的 JWKS 公钥（可选）。
- `cookieKey`: 存储认证上下文的 Cookie 名称（可选）。

### 获取用户身份信息

```python
data = authentication_client.get_user_info(
  access_token='YOUR_ACCESS_TOKEN',
)
```

## 管理你的用户

### 初始化

```python
from authing import ManagementClient

management_client = ManagementClient(
  access_key_id="AUTHING_USERPOOL_ID",
  access_key_secret="AUTHING_USERPOOL_SECRET",
)
```

`ManagementClient` 会自动从 Authing 服务器获取  Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `access_key_id`: 用户池 ID（必填）。
- `access_key_secret`: 用户池密钥（必填）。
- `timeout`: 请求超时时间（可选）。单位为毫秒，默认为 10000 （10 秒）。
- `host`: Authing 服务器地址。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: `https://authing-api.mydomain.com`，最后不带 `/` 。
- `lang`: 接口 Message 返回语言格式（可选）。可选值为 `zh-CN` 和 `en-US`，默认为 `zh-CN`。
- `use_unverified_ssl`: 不校验 `ssl` 证书（可选），默认为 `false`。

### 简单管理用户

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。例如：

- 获取用户列表

```python
data = management_client.list_users(
    page=1,
    limit=10
)
```

- 创建角色

```python
data = management_client.create_role(
  code='admin',
  description='管理员',
)
```

## 错误处理

```python
data = await management_client.get_user(
  userId="62559df6b2xxxx259877b5f4"
)

status_code, api_code, message = data.get('statusCode'), data.get('apiCode'), data.get('message')
if (status_code !== 200) {
  raise Exception(message); # 抛出异常，由全局异常捕捉中间件进行异常捕捉
}

// 继续你的业务逻辑 ...
```