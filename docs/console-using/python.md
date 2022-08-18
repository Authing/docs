# Python

本指南将从 Authing Python SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装


```bash
#使用 `pip` 进行安装
pip install authing
```

## 认证你的用户

### 初始化

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
    options=AuthenticationClientOptions(
        app_id='AUTHING_APP_ID',# 应用 ID
        secret='AUTHING_SECRET',# 应用 Secret
        app_host='AUTHING_DOMAIN',# 应用对应的用户池域名
        redirect_uri='AUTHING_REDIRECTURI'# 认证完成后的重定向目标 URL
    )
)
```

### 简单认证用户

```python
#生成 OIDC 协议的用户登录链接
data = authentication_client.build_authorize_url(scope="openid profile offline_access")
```

## 管理你的用户

### 初始化

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
    options=ManagementClientOptions(
        user_pool_id='AUTHING_USERPOOL_ID',# 用户池 ID
        secret='AUTHING_USERPOOL_SECRET',# 用户池密钥
        host='https://api.authing.cn'#  Authing 服务器地址
    )
)
```

### 简单管理用户


```python
#创建用户
data = management_client.users.create(
    userInfo={
        'email': 'admin@test.com',
        'password': 'test',
    }
)
```

## 错误处理


```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions
from authing.v2.exceptions import AuthingException

authentication_client = AuthenticationClient(
    options=AuthenticationClientOptions(
        app_id='AUTHING_APP_ID',
        secret='AUTHING_SECRET',
        app_host='AUTHING_DOMAIN',
        redirect_uri='AUTHING_REDIRECTURI'# 认证完成后的重定向目标 URL
    )
)

try:
    authentication_client.login_by_username(
        username='test',
        password='passw0rd',
    )
except AuthingException as e:
    print(e)
```
