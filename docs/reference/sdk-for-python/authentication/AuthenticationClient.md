---
meta:
  - name: description
    content: 认证核心模块
---

# 认证核心模块

<LastUpdated/>


此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。如果你倾向于以管理员的身份管理用户，请使用 [UsersManagementClient - 用户管理模块](../management/UsersManagementClient.md)。

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn'
))
authentication_client.login_by_email # 使用邮箱登录
authentication_client.send_sms_code # 发送验证码
authentication_client.get_access_token_by_code # 使用授权码 Code 获取用户的 Token 信息。
```

## 使用邮箱注册

```python
def register_by_email(
            self,
            email,
            password,
            profile=None,
            force_login=False,
            client_ip=None,
            custom_data=None,
            context=None
    ):
  pass
```

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `email` \<str\> 邮箱
- `password` \<str\> 密码
- `profile` \<dict\> 用户资料
- `force_login` \<bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用邮箱密码注册

```python
email = 'test@example.com'
user = authentication_client.register_by_email(
    email=email,
    password='passw0rd'
)
```

- 注册的同时设置用户信息（昵称和公司）

```python
email = 'test@example.com'
user = authentication_client.register_by_email(
    email=email,
    password='passw0rd',
    profile={
      'nickname': 'Nick',
      'company': '蒸汽记忆'
    }
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段

```python
email = 'test@example.com'
user = authentication_client.register_by_email(
    email=email,
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用用户名注册

```python
def register_by_username(
        self,
        username,
        password,
        profile=None,
        force_login=False,
        client_ip=None,
        custom_data=None,
        context=None
):
  pass
```

使用用户名注册，用户名区分大小写且用户池内唯一

#### 参数

- `username` \<str\> 用户名
- `password` \<str\> 密码
- `profile` \<dict\> 用户资料
- `force_login` \<bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用用户名密码注册

```python
username = 'bob'
user = authentication_client.register_by_username(
    username=username,
    password='passw0rd',
)
```

- 注册的同时设置用户信息（昵称和公司）


```python
username = 'bob'
user = authentication_client.register_by_username(
    username=username,
    password='passw0rd',
    profile={
      'nickname': 'Nick',
      'company': '蒸汽记忆'
    }
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段

```python
username = 'bob'
user = authentication_client.register_by_username(
    username=username,
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```


#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用手机号注册

```python
def register_by_phone_code(
        self,
        phone,
        code,
        password=None,
        profile=None,
        force_login=False,
        client_ip=None,
        custom_data=None,
        context=None
):
  pass
```

使用手机号注册，你可以同时设置该账号的初始密码。你可以通过 [send_sms_code](#发送短信验证码) 方法发送短信验证码

#### 参数

- `phone` \<str\> 手机号
- `code` \<str\> 短信验证码
- `password` \<str\> 初始密码
- `profile` \<dict\> 用户资料
- `force_login` \<bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用手机号验证码注册

```python
phone = '176xxxx6754'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
)
```

- 注册的同时设置密码

```python
phone = '176xxxx6754'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd'
)
```

- 注册的同时设置用户资料（昵称和公司）


```python
phone = '176xxxx6754'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd',
    profile={
      'nickname': 'Nick',
      'company': '蒸汽记忆'
    }
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段


```python
phone = '176xxxx6754'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 使用邮箱登录

```python
def login_by_email(
        self,
        email,
        password,
        auto_register=False,
        captcha_code=None,
        client_ip=None,
        custom_data=None,
        context=None
):
  pass
```

使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)

#### 参数

- `email` \<str\> 邮箱
- `password` \<str\> 密码
- `auto_register` \<bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号
- `captcha_code` \<str\> 图形验证码
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用邮箱密码登录

```python
email = 'test@example.com'
user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
)
```

- 屡次登录失败，当需要输入图形验证码时

```python
email = 'test@example.com'
try:
  user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
  )
except AuthingException as e:
  if e.code == 2000:
    user = authentication_client.login_by_email(
      email=email,
      password='passw0rd',
      captcha_code='xj72'
    )
```

- 登录的同时设置自定义字段

```python
email = 'test@example.com'
user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 使用用户名登录

```python
def login_by_username(
        self,
        username,
        password,
        auto_register=False,
        captcha_code=None,
        client_ip=None,
        custom_data=None,
        context=None
):
  pass
```

使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)

#### 参数

- `username` \<str\> 用户名
- `password` \<str\> 密码
- `auto_register` \<bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号
- `captcha_code` \<str\> 图形验证码
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用用户名、密码登录

```python
username = 'bob'
user = authentication_client.login_by_username(
    username=username,
    password='passw0rd',
)
```

- 屡次登录失败，当需要输入图形验证码时

```python
username = 'bob'
try:
  user = authentication_client.login_by_username(
    username=username,
    password='passw0rd',
  )
except AuthingException as e:
  if e.code == 2000:
    user = authentication_client.login_by_username(
      username=username,
      password='passw0rd',
      captcha_code='xj72'
    )
```

- 登录的同时设置自定义字段

```python
username = 'bob'
user = authentication_client.login_by_username(
    username=username,
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```


## 使用手机号验证码登录

```python
def login_by_phone_code(
  self,
  phone,
  code,
  client_ip=None,
  custom_data=None,
  context=None
):
  pass
```

使用手机号验证码登录。你需要先使用 [send_sms_code](#发送短信验证码) 方法发送短信验证码

#### 参数

- `phone` \<str\> 手机号
- `code` \<str\> 短信验证码
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用手机号验证码登录

```python
phone = '176xxxx6754'
# 手机号验证码登录，如果用户不存在会自动创建账号
user = authentication_client.login_by_phone_code(
    phone=phone,
    code='1234',
)
```

- 登录的同时设置自定义数据

```python
phone = '176xxxx6754'
# 手机号验证码登录，如果用户不存在会自动创建账号
user = authentication_client.login_by_phone_code(
    phone=phone,
    code='1234',
    custom_data={
      'source': 'google'
    }
)
```

## 使用手机号密码登录

```python
def login_by_phone_password(
  self, 
  phone, 
  password, 
  auto_register=False, 
  captcha_code=None, 
  client_ip=None,
  custom_data=None,
  context=None
):
  pass
```

如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)

#### 参数

- `phone` \<str\> 手机号
- `password` \<str\> 密码
- `captcha_code` \<str\> 图形验证码
- `client_ip` \<str\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `custom_data` \<str\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `context`: \<dict\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用手机号密码登录

```python
phone = '176xxxx6754'
user = authentication_client.login_by_phone_password(
    phone=phone,
    password='passw0rd',
)
```

- 屡次登录失败，当需要输入图形验证码时

```python
phone = '176xxxx6754'
try:
  user = authentication_client.login_by_phone_password(
    phone=phone,
    password='passw0rd',
  )
except AuthingException as e:
  if e.code == 2000:
    user = authentication_client.login_by_phone_password(
      phone=phone,
      password='passw0rd',
      captcha_code='xj72'
    )
```

- 登录的同时设置自定义数据

```python
phone = '176xxxx6754'
user = authentication_client.login_by_phone_password(
    phone=phone,
    password='passw0rd',
    custom_data={
      'source': 'google'
    }
)
```

## 使用 LDAP 用户名登录

```python
def login_by_ldap(self, username, password):
  pass
```

使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息

点此查看[连接 LDAP 身份源](/connections/ldap/)文档

#### 参数

- `username` \<str\> 用户名
- `password` \<str\> 密码

#### 示例

```python
username = 'bob'
user = authentication_client.login_by_ldap(
    username=username,
    password='passw0rd'
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用 AD 用户名登录

```python
def login_by_ad(self, username, password):
  pass
```

使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息

点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档

#### 参数

- `username` \<str\> 用户名
- `password` \<str\> 密码

#### 示例

```python
username = 'bob'
user = authentication_client.login_by_ad(
    username=username,
    password='passw0rd'
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 获取当前登录的用户信息

```python
def get_current_user(self, token=None):
  pass
```

获取当前登录用户的用户信息，需要 authentication_client 当前处于已登录状态才能获取到。你可以通过两种方式设置 authentication_client 的登录状态：
1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，authentication_client 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态
2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 authentication_client

你也可以手动传入用户的 [id_token](/concepts/id-token.md)，检查其此 `id_token` 的登录状态

#### 参数

- `token` \<str\> 用户的 [id_token](/concepts/id-token.md)，可选

#### 示例

- 调用登录接口之后获取用户信息

```python
username = 'bob'
authentication_client.login_by_username(
    username=username,
    password='passw0rd',
)

user = authentication_client.get_current_user()
```

- 通过用户的 [id_token](/concepts/id-token.md) 初始化之后获取用户信息

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    token='ID_TOKEN'
))

user = authentication_client.get_current_user()
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 退出登录

```python
def logout(self):
  pass
```

用于用户退出登录，会执行以下操作：

1. 清空该用户在当前应用下的 session 会话信息
2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据

#### 示例

```python
success = authentication_client.logout()
```

#### 返回值

是否退出登录成功

## 发送短信验证码

```python
def send_sms_code(self, phone):
  pass
```

发送短信验证码, 目前仅支持国内手机号；该接口有接口频率限制，请勿频繁请求

#### 参数

- `phone` \<str\> 手机号

#### 示例

```python
authentication_client.send_sms_code(
  phone="176xxxx6754",
)
```

## 发送邮件

```python
def send_email(self, email, scene):
  pass
```

主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)

#### 参数

- `email` \<str\> 邮箱
- `scene` \<str\> 发送场景，可选值包含：
  - RESET_PASSWORD: 发送重置密码邮件，邮件中包含验证码
  - VERIFY_EMAIL: 发送验证邮箱的邮件
  - CHANGE_EMAIL: 发送修改邮箱邮件，邮件中包含验证码
  - MFA_VERIFY: 发送 MFA 验证邮件
#### 示例

- 发送重置密码邮件，会将包含验证码的邮件发送到用户的邮箱

```python
authentication_client.send_email(
  email="test@example.com",
  scene="RESET_PASSWORD",
)
```

- 之后用户可以使用邮箱验证码重置密码


```python
authentication_client.reset_password_by_email_code(
  email="test@example.com",
  code="1234",
  new_password="new_passw0rd"
)
```

## 获取自定义数据

```python
def get_udf_value(self):
  pass
```

获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)

#### 示例

```python
data = authentication_client.get_udf_value()
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 设置自定义数据

```python
def set_udf_value(self, data):
  pass
```

设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉

#### 参数

- `data` \<str\> 输入数据，类型为一个字典，详情请见示例

#### 示例

```python
success = authentication_client.set_udf_value({
  'school': '华中科技大学',
  'age': 22
})
```

#### 返回值

- 会返回一个 `bool` 类型的值，表示是否设置成功

## 删除自定义数据

```python
def remove_udf_value(self, key):
  pass
```

删除用户的某一个自定义数据

#### 参数

- `key` \<str\> 自定义字段的 key 

#### 示例

```python
success = authentication_client.remove_udf_value('school')
```

## 检测 Token 登录状态

```python
def check_login_status(self, token=None):
  pass
```

检测用户 [id_token](/concepts/id-token.md) 的登录状态

#### 参数

- `token` \<str\> 用户的登录凭证 token

#### 示例

```python
# 检查任意 token 的有效状态
data = authentication.check_login_status(token="TOKEN")

# 之前调用过登录或者通过 access_token 初始化
# 检查当前用户的登录状态
data = authentication.check_login_status()
```

#### 示例数据

- 成功示例

```json
{
    "code": 200,
    "message": "已登录",
    "status": true,
    "exp": 1620732833,
    "iat": 1619523233,
}
```

- 失败示例

```json
{
  "code": 2206,
  "message": "登录信息已过期",
  "status": false,
  "exp": null,
  "iat": null,
}
```

## 通过短信验证码重置密码

```python
def reset_password_by_phone_code(self, phone, code, new_password):
  pass
```

通过短信验证码重置密码，你可以通过 [send_sms_code](#发送短信验证码) 方法发送短信验证码

#### 参数

- `phone` \<str\> 手机号
- `code` \<str\> 验证码
- `new_password` \<str\> 新的密码

#### 示例

```python
authentication_client.reset_password_by_phone_code(
  phone="176xxxx6754",
  code="1234",
  new_password="passw0rd"
)
```

## 通过邮件验证码重置密码


```python
def reset_password_by_email_code(self, email, code, new_password):
  pass
```

通过邮件验证码重置密码，你需要先调用 [send_email](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）

#### 参数

- `phone` \<str\> 手机号
- `code` \<str\> 验证码
- `new_password` \<str\> 新的密码

#### 示例

```python
authentication_client.reset_password_by_email_code(
  email="test@example.com",
  code="1234",
  new_password="passw0rd"
)
```

## 修改用户资料

```python
def update_profile(self, updates):
  pass
```

修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 [update_phone](#更新用户手机号)、[update_email](#更新用户邮箱)、[update_password](#更新用户密码) 接口

#### 参数

- `updates` \<dict\> 修改的用户资料
- `updates.username` \<str\> 用户名
- `updates.nickname` \<str\> 昵称
- `updates.photo` \<str\> 头像
- `updates.company` \<str\> 公司
- `updates.browser` \<str\> 浏览器
- `updates.device` \<str\> 设备
- `updates.lastIP` \<str\> 最近登录的 IP
- `updates.name` \<str\> Name
- `updates.givenName` \<str\> Given Name
- `updates.familyName` \<str\> Family Name
- `updates.middleName` \<str\> Middle Name
- `updates.profile` \<str\> Profile Url
- `updates.preferredUsername` \<str\> Preferred Name
- `updates.website` \<str\> 个人网站
- `updates.gender` \<str\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `updates.birthdate` \<str\> 生日
- `updates.zoneinfo` \<str\> 时区
- `updates.locale` \<str\> 语言
- `updates.address` \<str\> 地址
- `updates.streetAddress` \<str\> 街道地址
- `updates.locality` \<str\>
- `updates.region` \<str\> 地域
- `updates.postalCode` \<str\> 邮编
- `updates.city` \<str\> 城市
- `updates.province` \<str\> 省份
- `updates.country` \<str\> 国家

#### 示例

- 修改昵称和最近登录地址

```python
user = authentication_client.update_profile({
    'nickname': 'Nick',
    'lastIp': '111.111.111.111',
})
```
- 不能直接修改手机号、邮箱、密码，会报错

```python
try:
  authentication_client.update_profile({
    'phone': '176xxxx6754'
  })
except AuthingException as e:
  // this will fail, you can't change your phone directly, must verify by phone code
  pass

```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 更新用户密码

```python
def update_password(self, new_password, old_password):
  pass
```

更新用户密码，需要提供原始密码

#### 参数

- `new_password` \<str\> 新密码
- `old_password` \<str\> 旧密码，如果用户没有设置密码，可以不填

#### 示例

- 由手机号、社会化登录等其他方式注册的，首次没有设置密码，old_password 留空

```python
authentication_client.update_password(
  new_password="passw0rd",
)
```

- 用户之前设置了密码

```python
authentication_client.update_password(
  new_password="passw0rd",
  old_password="123456!"
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 绑定手机号

```python
def bind_phone(self, phone, phone_code):
  pass
```

用户初次绑定手机号，如果需要修改手机号请使用 [update_phone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [send_sms_code](#发送短信验证码) 方法

终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<str\> 手机号
- `phone_code` \<str\> 手机号验证码

#### 示例

```python
phone = '176xxxx6754'
user = authentication_client.bind_phone(
    phone=phone,
    phoneCode='1234',
)
```

## 解绑手机号

```python
def unbind_phone(self):
  pass
```

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误

终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```python
user = authentication_client.unbind_phone()
```

#### 返回值

该接口会返回最新的用户信息

- [用户信息](/guides/user/user-profile.md)


## 更新用户手机号

```python
def update_phone(self, phone, phone_code, old_phone=None, old_phone_code=None):
  pass
```

更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）

也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号

开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭

![](https://cdn.authing.cn/img/20210414110024.png)

用户首次绑定手机号请使用 [bind_phone](#绑定手机号) 接口

#### 参数

- `phone` \<str\> 新手机号
- `phone_code` \<str\> 新手机号的验证码
- `old_phone` \<str\> 旧手机号
- `old_phone_code` \<str\> 旧手机号的验证码

#### 示例

- 关闭了“验证原有手机号“选项

```python
authentication_client.update_email(
  phone="test1@example.com",
  phoneCode="1234",
)
```

- 开启了“验证原有手机号“选项

```python
authentication_client.update_email(
  phone="test1@example.com",
  phoneCode="1234",
  oldPhone="test2@exmaple.com",
  oldPhoneCode="1234"
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 绑定邮箱

```python
def bind_email(self, email, email_code):
  pass
```

用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [update_email](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [send_email](#发送邮件) 方法

终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<str\> 邮箱
- `email_code` \<str\> 邮件验证码，可通过 [send_email](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL

#### 示例

```python
email = 'test@example.com'
user = authentication_client.bind_email(
    email=phone,
    email_code='1234',
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 解绑邮箱

```python
def unbind_email(self):
  pass
```

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误

终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```python
user = authentication_client.get_current_user()
if user.get('email'):
  user = authentication_client.unbind_email()
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 更新用户邮箱

```python
def update_email(self, email, email_code, old_email=None, old_email_code=None):
  pass
```


如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱

开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭

![](https://cdn.authing.cn/img/20210414105928.png)

用户首次绑定邮箱请使用 [bind_email](#绑定邮箱) 接口

#### 参数

- `email` \<str\> 新邮箱
- `email_code` \<str\> 新邮箱的验证码
- `old_email` \<str\> 旧邮箱
- `old_email_code` \<str\> 旧邮箱的验证码

#### 示例

- 关闭了“验证原有邮箱“选项

```python
authentication_client.update_email(
  email="test1@example.com",
  email_code="1234",
)
```

- 开启了“验证原有邮箱“选项

```python
authentication_client.update_email(
  email="test1@example.com",
  email_code="1234",
  old_email="test2@exmaple.com",
  old_email_code="1234"
)
```

## 合并账号身份信息

```python
def link_account(self, primary_user_token, secondary_user_token):
  pass
```

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `primary_user_token` \<str\> 主账号 Token
- `secondary_user_token` \<str\> 子账号 Token

#### 示例

```python
primary_user_token = 'xxx'
secondary_user_token = 'xxx'
authentication_client.link_account(
  primary_user_token=primary_user_token,
  secondary_user_token=secondary_user_token
)
```

#### 返回值

- 会返回一个 `bool` 类型的值，表示是否设置成功

<!-- ## 解绑社交账号


```python
def unlink_account(self, primary_user_token, provider):
  pass
```

主账号解绑社会化登录账号

#### 参数

- `primary_user_token` \<string\> 主账号用户的 `id_token`
- `provider` \<string\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)

#### 示例

```python
authentication_client.unlink_account(
  primary_user_token='xxx',
  provider='github'
)
```

#### 返回值

- 会返回一个 `bool` 类型的值，表示是否设置成功 -->

## 获取用户账号安全等级

```python
def get_security_level(self):
  pass
```

获取此账号的账号安全等级

#### 示例

```python
data = authentication_client.get_security_level()
```

#### 示例数据

```json
{
    "score": 65,
    "email": true,
    "phone": false,
    "password": true,
    "passwordSecurityLevel": 1,
    "mfa": false
}
```

字段释义：

- `email`: \<bool\>，是否绑定了邮箱
- `mfa`: \<bool\>，是否绑定了个人 MFA
- `password`: \<bool\>，是否设置了密码
- `phone`: \<bool\>，是否绑定了手机号
- `passwordSecurityLevel`: \<int | null\>，密码安全登录，`null` 表示还没检测过密码安全等级
  - `1`: 低
  - `2`: 中
  - `3`: 高
- `score`: \<int\>，账户安全等级总体评分，最高 100 分


## 获取用户被授权的所有资源列表

```python
def list_authorized_resources(self, namespace, resource_type=None):
  pass
```

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源

#### 参数

- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据

#### 示例

```python
data = authentication_client.list_authorized_resources(
  namespace='default'
)
```

#### 示例数据
```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```

## 获取当前用户能够访问的应用

```python
def list_applications(self, page=1, limit=10):
  pass
```

获取当前用户能够访问的应用

#### 参数

-  `page` \<int\> 分页序号, 默认为 `1`
-  `limit` \<int\> 每页返回的个数, 默认为 `10`

#### 示例

```python
data = authentication_client.list_applications()
_list, total_count = data.get('list'), data.get('totalCount')
```

#### 示例数据
```json
{
  "list": [
    {
          "id": "5f97fb40d352ecf69ffe6d98",
          "name": "oo",
          "logo": "https://files.authing.co/authing-console/default-app-logo.png",
          "domain": "okokiohutuyfrtd",
          "description": null,
          "createdAt": "2020-10-27T10:49:36.817Z",
          "updatedAt": "2021-03-17T10:39:53.650Z",
          "protocol": "oidc"
      }
  ],
  "totalCount": 1
}
```


## 检查密码强度

```python
def check_password_strength(self, password):
  pass
```

检查密码强度，详情请见 [https://docs.authing.co/v2/guides/security/config-password.html](https://docs.authing.co/v2/guides/security/config-password.html)

#### 参数
-  `password` \<str\> 密码
#### 示例

```python
authentication.check_password_strength('123456')
```

#### 示例数据
```json
{
  "message": "密码验证成功",
  "valid": true
}
```




## 刷新当前用户的 Token

```python
def refresh_token(self, token=None):
  pass
```

刷新当前用户的 Token

#### 参数
-  `token` \<str\> 用户 Token
#### 示例

```python
user = self.authentication.login_by_email(email,password)
        res = self.authentication.refresh_token()
```

#### 示例数据
```json
{
  "iat": 1632467937,
  "token": "newToken",
  "exp": 1633677537
}
```


## 添加自定义数据

```python
def set_udv(self, key, value):
  pass
```

添加自定义数据

#### 参数
- `key` \<str\> 自定义数据 Key
- `value` \<str\> 自定义数据 Key
#### 示例

```python
management.udf.set(
            targetType="USER", key="school", dataType="STRING", label="学校")
authentication.set_udv(key="school", value="ucla")
```

#### 示例数据
```json
[{
  "dataType": "STRING",
  "value": "ucla",
  "key": "school",
  "label": "学校"
}]
```



## 删除自定义数据

```python
def remove_udv(self, key):
  pass
```

删除自定义数据

#### 参数
- `key` \<str\> 自定义数据 Key
#### 示例

```python
authentication.remove_udv( key="age" )
```

#### 示例数据
```json
[]
```


## 获取用户所在组织机构

```python
def list_orgs(self):
  pass
```

获取用户所在组织机构

#### 示例

```python
authentication_client.login_by_username('username', 'password')
data = authentication_client.list_orgs()
```

#### 示例数据
```json
[]
```


## 获取用户拥有的角色列表

```python
def list_roles(self, namespace=None):
  pass
```

获取用户拥有的角色列表
#### 参数
- `namespace` \<str\> 命名空间
#### 示例

```python
authentication_client.list_roles()
```

#### 示例数据
```json
{
  "totalCount": 1,
  "list": [{
    "code": "rdvienjquv",
    "description": null,
    "parent": null,
    "namespace": "default",
    "arn": "arn:cn:authing:61384d3e302f1f75e69ce95a:role:614d7e6fba71103fcf5af5df",
    "updatedAt": "2021-09-24T07:29:51+00:00",
    "id": "614d7e6fba71103fcf5af5df",
    "createdAt": "2021-09-24T07:29:51+00:00"
  }]
}
```

## 判断当前用户是否有某个角色

```python
def has_role(self, code, namespace=None):
  pass
```

判断当前用户是否有某个角色
#### 参数
- `code` \<str\> 角色 Code
- `namespace` \<str\> 命名空间
#### 示例

```python
authentication_client.has_role(code)
```

#### 示例数据
```python
bool
```



## 检测当前登录状态

```python
def check_logged_in(self):
  pass
```

检测当前登录状态

#### 示例

```python
authentication_client.check_logged_in()
```

#### 示例数据
```python
当前用户或者抛出异常
```



## 登录子账号

```python
def login_by_sub_account(self, 
                          account, 
                          password, 
                          captcha_code=None, 
                          client_ip=None):
  pass
```

登录子账号
#### 参数
- `account` \<str\> 账号
- `password` \<str\> 密码
- `captcha_code` \<str\> 验证码
- `client_ip` \<str\> 登录客户端 IP
#### 示例

```python
authentication_client.login_by_sub_account("123456789","8558781")
```

#### 示例数据
```json
{
	"username": "123456789",
	"preferredUsername": null,
	"tokenExpiredAt": "2021-10-08T07:43:04+00:00",
	"locale": null,
	"photo": "https://files.authing.co/authing-console/default-user-avatar.png",
	"updatedAt": "2021-09-24T07:43:04+00:00",
	"formatted": null,
	"device": null,
	"gender": "U",
	"id": "613872b19c90be7d4da6",
	"arn": "arn:cn:authing:61384d3e302f1f75e:user:613872b19c90be7d4da",
	"blocked": false,
	"loginsCount": 23,
	"city": null,
	"province": null,
	"userPoolId": "61384d3e302f1f75e",
	"locality": null,
	"middleName": null,
	"country": null,
	"zoneinfo": null,
	"lastIP": "111.202.167.54",
	"website": null,
	"streetAddress": null,
	"externalId": null,
	"isDeleted": false,
	"postalCode": null,
	"email": "",
	"status": "Activated",
	"openid": null,
	"company": null,
	"familyName": null,
	"phone": "18515",
	"registerSource": ["basic:phone-code"],
	"profile": null,
	"address": null,
	"oauth": null,
	"password": "cfdf0fee5f3d1b8f27a507ad98d0",
	"nickname": "子账号",
	"createdAt": "2021-09-08T08:22:09+00:00",
	"givenName": null,
	"name": null,
	"emailVerified": false,
	"region": null,
	"birthdate": null,
	"token": "eyJhbGciOiJIUNDY5Mzg0LCJpc3MiOiJodHRwczovL24xc2o2OC1kZW1vLmF1dGhpbmcuY24vb2lkYyJ9.1-e7ZJfJgRAZeDyGHalqbBUjJ76qUeJzGtzxSfPCCsE",
	"phoneVerified": true,
	"lastLogin": "2021-09-24T07:43:04+00:00",
	"unionid": null,
	"browser": null,
	"signedUp": "2021-09-08T08:22:09+00:00"
}
```



## 通过首次登录的 Token 重置密码

```python
def reset_password_by_first_token(self, token, password):
  pass
```

通过首次登录的 Token 重置密码，需要在创建用户时设置“强制用户首次登录时修改密码”
#### 参数
- `token` \<str\> 首次登录的 Token
- `password` \<str\> 密码

#### 示例

```python
authentication.reset_password_by_first_token(user['token'],password)
```


## 通过密码强制更新临时 Token 修改密码

```python
def reset_password_with_force_reset(self, token, old_password, new_password):
  pass
```

通过密码强制更新临时 Token 修改密码
#### 参数
- `token` \<str\> 首次登录的 Token
- `old_password` \<str\> 旧密码
- `new_password` \<str\> 新密码
#### 示例

```python
authentication.reset_password_with_force_reset(user['token'],password,new_password)
```


## 获取用户所有部门

```python
def list_departments(self):
  pass
```

获取用户所有部门

#### 示例

```python
authentication.login_by_email(
            email='cc@authing.cn',
            password='pwd',
        )
res = authentication.list_departments()
```
#### 示例数据
```json
{
  "departments": {
    "totalCount": 1,
    "list": [{
      "department": {
        "code": null,
        "description": null,
        "updatedAt": "2021-09-16T06:46:11+00:00",
        "children": [],
        "namePath": ["xx2", "qqqx", "q2"],
        "order": null,
        "descriptionI18n": null,
        "depth": null,
        "orgId": "6142c2c41c6e6c6cc3edf",
        "path": ["6142c2c4f8abf18c6c978b", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
        "nameI18n": null,
        "codePath": ["codes", null, null],
        "root": false,
        "id": "6142e833716601219e93d3",
        "createdAt": "2021-09-16T06:46:11+00:00",
        "name": "q2"
      },
      "joinedAt": "2021-09-16T08:48:23+00:00",
      "isMainDepartment": false
    }]
  }
}
```



## 判断用户是否存在

```python
def is_user_exists(self, 
                    user_name=None, 
                    email=None, 
                    phone=None, 
                    external_id=None):
  pass
```

判断用户是否存在
#### 参数
- `user_name` \<str\> 用户名
- `email`  \<str\> 邮箱
- `phone`  \<str\> 电话
- `external_id`  \<str\> 数据源ID
#### 示例

```python
authentication.is_user_exists(email="fptvmzqyxn@authing.cn")
```
#### 示例数据
```python
bool
```


## 通过远端服务验证票据合法性

```python
def validate_ticket_v2(self, ticket, service, format='XML'):
  pass
```

通过远端服务验证票据合法性
#### 参数
- `ticket` \<str\> 票据
- `service`  \<str\> 验证服务地址
- `format`  \<str\> 数据格式 取值仅 XML,JSON

#### 示例

```python
authentication.validate_ticket_v2("zxzc","http://localhost:3000")
```



## SSO 检测登录态

```python
def track_session(self):
  pass
```

SSO 检测登录态


#### 示例

```python
authentication.track_session()
```

#### 示例数据
```json
{"session": null}
```


## 通过微信登录

```python
def wechat_login(self, code, country=None, lang=None, state=None):
  pass
```

通过微信登录
#### 参数
- `code` \<str\> Code
- `country`  \<str\> 国家
- `lang`  \<str\> 语言
- `state`  \<str\> 状态
#### 示例

```python
authentication.wechat_login('code')
```
