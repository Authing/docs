# Python

本指南将从 Authing Python SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

我们推荐使用 `pip` 进行安装，它可以与一些模块打包工具很好地配合使用。

```bash
pip install authing
```

## 认证你的用户

### 初始化

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
    options=AuthenticationClientOptions(
        app_id='AUTHING_APP_ID',
        secret='AUTHING_SECRET',
        app_host='AUTHING_DOMAIN',
        redirect_uri='AUTHING_LOGOUTREDIRECTURI'
    )
)
```

完整的参数和释义如下：

- `app_id`: 应用 ID（必填）。
- `secret`: 应用 Secret（必填）。
- `app_host`: 应用对应的用户池域名，例如 pool.authing.cn，最后不带 `/` （必填）。
- `redirect_uri`: 认证完成后的重定向目标 URL（必填）。

### 检测 Token 登录状态

```python
data = authentication_client.check_login_status('YOUR_ACCESS_TOKEN')
```

## 管理你的用户

### 初始化

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
    options=ManagementClientOptions(
        user_pool_id='AUTHING_USERPOOL_ID',
        secret='AUTHING_USERPOOL_SECRET',
        host='AUTHING_DOMAIN'
    )
)
```

完整的参数和释义如下：

- `user_pool_id`: 用户池 ID（必填）。
- `secret`: 用户池密钥（必填）。
- `host`: Authing 服务器地址。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: `https://authing-api.mydomain.com`，最后不带 `/` 。

### 简单管理用户

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。例如：

- 获取用户列表

```python
data = management_client.users.list()
```

- 创建角色

```python
data = management_client.roles.create(code='role1', description='this is description', namespace='default')
```

## 错误处理

你可以使用 `try catch` 进行错误处理：

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
