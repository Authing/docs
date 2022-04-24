---
meta:
  - name: description
    content: 认证核心模块
---

# 认证核心模块

<LastUpdated/>


此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。如果你倾向于以管理员的身份管理用户，请使用 [UsersManagementClient - 用户管理模块](../management/UsersManagementClient.md)。

```go
import (
	"fmt"
	"github.com/Authing/authing-go-sdk/lib/constant"
	"github.com/Authing/authing-go-sdk/lib/model"
	jsoniter "github.com/json-iterator/go"
	"log"
)

authenticationClient := NewClient(AppId, Secret)
 
authenticationClient.LoginByEmail # 使用邮箱登录
authenticationClient.SendSmsCode # 发送验证码
authenticationClient.GetAccessTokenByCode # 使用授权码 Code 获取用户的 Token 信息
```

## 使用邮箱注册

```go
// RegisterByEmail
// 使用邮箱注册
func (c *Client) RegisterByEmail(request *model.RegisterByEmailInput) (*model.User, error) 
```

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 EmailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `request` \<RegisterByEmailInput\>  
- `RegisterByEmailInput.Email` \<string\> 邮箱
- `RegisterByEmailInput.Password` \<string\> 密码
- `RegisterByEmailInput.Profile` \<*RegisterProfile\> 用户资料
- `RegisterByEmailInput.ForceLogin` \<*bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `RegisterByEmailInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `RegisterByEmailInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `RegisterByEmailInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用邮箱密码注册

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := &model.RegisterByEmailInput{
		Email:    "email@qq.com",
		Password: "123456",
}
resp, err := authenticationClient.RegisterByEmail(req)
```

- 注册的同时设置用户信息（昵称和公司）

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
 
company:="company"
nickName:="nickName"
req := &model.RegisterByEmailInput{
	Email:    "email@qq.com",
	Password: "123456",
	Profile: &model.RegisterProfile{
    		Nickname: &nickName,
    		Company: &company,
    },
}
resp, err := authenticationClient.RegisterByEmail(req)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := &model.RegisterByEmailInput{
	Email:    "email@qq.com",
	Password: "123456",
	Params:   &p,
}
resp, err := authenticationClient.RegisterByEmail(req)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用用户名注册

```go
// RegisterByUsername
// 使用用户名注册
func (c *Client) RegisterByUsername(request *model.RegisterByUsernameInput) (*model.User, error)
```

使用用户名注册，用户名区分大小写且用户池内唯一

#### 参数
- `request` \<RegisterByUsernameInput\>  
- `RegisterByUsernameInput.Username` \<string\> 用户名
- `RegisterByUsernameInput.Password` \<string\> 密码
- `RegisterByUsernameInput.Profile` \<*RegisterProfile\> 用户资料
- `RegisterByUsernameInput.ForceLogin` \<*bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `RegisterByUsernameInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `RegisterByUsernameInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `RegisterByUsernameInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例
 
```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool

company:="company"
nickName:="nickName" 
req := &model.RegisterByUsernameInput{
	Username: "gosdk",
	Password: "123456",
    Profile: &model.RegisterProfile{
       	Nickname: &nickName,
       	Company: &company,
    },
}
resp, err := authenticationClient.RegisterByUsername(req)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := &model.RegisterByUsernameInput{
	Username: "gosdk",
	Password: "123456",
	Params:   &p,
}
resp, err := authenticationClient.RegisterByUsername(req)
```


#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用手机号注册

```go
// RegisterByPhoneCode
// 使用手机号及验证码注册
func (c *Client) RegisterByPhoneCode(request *model.RegisterByPhoneCodeInput) (*model.User, error)
```

使用手机号注册，你可以同时设置该账号的初始密码。你可以通过 [SendSmsCode](#发送短信验证码) 方法发送短信验证码

#### 参数
- `request` \<RegisterByPhoneCodeInput\>  
- `RegisterByPhoneCodeInput.Phone` \<string\> 手机号
- `RegisterByPhoneCodeInput.Code` \<string\> 短信验证码
- `RegisterByPhoneCodeInput.Password` \<*string\> 密码
- `RegisterByPhoneCodeInput.Profile` \<*RegisterProfile\> 用户资料
- `RegisterByPhoneCodeInput.ForceLogin` \<*bool\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 
- `RegisterByPhoneCodeInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `RegisterByPhoneCodeInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `RegisterByPhoneCodeInput.Context`: \<*string\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用手机号验证码注册

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := &model.RegisterByPhoneCodeInput{
	Phone:  "1586xxxx492",
	Code:   "123456",
}
resp, err := authenticationClient.RegisterByPhoneCode(req)
```

- 注册的同时设置密码

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
password:="password"
req := &model.RegisterByPhoneCodeInput{
	Phone:  "1586xxxx492",
	Code:   "123456",
    Password: &password,
}
resp, err := authenticationClient.RegisterByPhoneCode(req)
```

- 注册的同时设置用户资料（昵称和公司）


```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool

company:="company"
nickName:="nickName" 
req := &model.RegisterByPhoneCodeInput{
	Phone:  "1586xxxx492",
    Code:   "123456",
    Profile: &model.RegisterProfile{
       	Nickname: &nickName,
       	Company: &company,
    },
}
resp, err := authenticationClient.RegisterByPhoneCode(req)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段


```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := &model.RegisterByPhoneCodeInput{
	Phone:  "1586xxxx492",
    Code:   "123456",
	Params:   &p,
}
resp, err := authenticationClient.RegisterByPhoneCode(req)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 使用邮箱登录

```go
// LoginByEmail
// 使用邮箱登录
func (c *Client) LoginByEmail(request model.LoginByEmailInput) (*model.User, error)
```

使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)

#### 参数
- `request` \<LoginByEmailInput\> 请求
- `LoginByEmailInput.Email` \<string\> 邮箱
- `LoginByEmailInput.Password` \<string\> 密码
- `LoginByEmailInput.CaptchaCode` \<*string\> 图形验证码
- `LoginByEmailInput.AutoRegister` \<*bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号
- `LoginByEmailInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `LoginByEmailInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `LoginByEmailInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用邮箱密码登录

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := model.LoginByEmailInput{
	Email:        "email@authing.cn",
	Password:     "1234",
	CaptchaCode:  nil,
	AutoRegister: nil,
	ClientIp:     nil,
	Params:       nil,
	Context:      nil,
}
resp, err := authenticationClient.LoginByEmail(req)
```

- 登录的同时设置自定义字段

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool

data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := model.LoginByEmailInput{
	Email:        "email@authing.cn",
	Password:     "1234",
	CaptchaCode:  nil,
	AutoRegister: nil,
	ClientIp:     nil,
	Params:       &p,
	Context:      nil,
}
resp, err := authenticationClient.LoginByEmail(req)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 使用用户名登录

```go
// LoginByUserName
// 使用用户名登录
func (c *Client) LoginByUserName(request model.LoginByUsernameInput) (*model.User, error)
```

使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)

#### 参数
 
- `request` \<LoginByUsernameInput\> 请求
- `LoginByUsernameInput.username` \<string\> 用户名
- `LoginByUsernameInput.Password` \<string\> 密码
- `LoginByUsernameInput.CaptchaCode` \<*string\> 图形验证码
- `LoginByUsernameInput.AutoRegister` \<*bool\> 是否自动注册，如果检测到用户不存在，会根据登录账密自动创建一个账号
- `LoginByUsernameInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `LoginByUsernameInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `LoginByUsernameInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到

#### 示例

- 使用用户名、密码登录

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := model.LoginByUsernameInput{
	Username:     "email@authing.cn",
	Password:     "1234",
	CaptchaCode:  nil,
	AutoRegister: nil,
	ClientIp:     nil,
	Params:       nil,
	Context:      nil,
}
resp, err := authenticationClient.LoginByUserName(req)
```

- 登录的同时设置自定义字段

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool

data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := model.LoginByUsernameInput{
	Username:      "email@authing.cn",
	Password:     "1234",
	CaptchaCode:  nil,
	AutoRegister: nil,
	ClientIp:     nil,
	Params:       &p,
	Context:      nil,
}
resp, err := authenticationClient.LoginByUserName(req)
```


## 使用手机号验证码登录

```go
// LoginByPhoneCode
// 使用手机号验证码登录
func (c *Client) LoginByPhoneCode(req *model.LoginByPhoneCodeInput) (*model.User, error) 
```

使用手机号验证码登录。你需要先使用 [SendSmsCode](#发送短信验证码) 方法发送短信验证码

#### 参数
 
- `req` \<LoginByPhoneCodeInput\> 请求
- `LoginByPhoneCodeInput.Phone` \<string\> 手机号
- `LoginByPhoneCodeInput.Code` \<string\> 验证码
- `LoginByPhoneCodeInput.AutoRegister` \<*bool\> 是否自动注册，如果检测到用户不存在，会根据登录账密自动创建一个账号
- `LoginByPhoneCodeInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `LoginByPhoneCodeInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `LoginByPhoneCodeInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到


#### 示例

- 使用手机号验证码登录

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := &model.LoginByPhoneCodeInput{
	Code:  "3289",
	Phone: "189xxxx1835",
}
resp, err := authenticationClient.LoginByPhoneCode(req)
```

- 登录的同时设置自定义数据

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := &model.LoginByPhoneCodeInput{
	Code:  "3289",
	Phone: "189xxxx1835",
    Params:       &p,
}
resp, err := authenticationClient.LoginByPhoneCode(req)
```

## 使用手机号密码登录

```go
// LoginByPhonePassword
// 使用手机号密码登录
func (c *Client) LoginByPhonePassword(request model.LoginByPhonePasswordInput) (*model.User, error)
```

如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)

#### 参数

- `request` \<LoginByPhonePasswordInput\> 请求
- `LoginByPhonePasswordInput.Phone` \<string\> 手机号
- `LoginByPhonePasswordInput.Password` \<string\> 密码
- `LoginByPhonePasswordInput.CaptchaCode` \<*string\> 图形验证码
- `LoginByPhonePasswordInput.AutoRegister` \<*bool\> 是否自动注册，如果检测到用户不存在，会根据登录账密自动创建一个账号
- `LoginByPhonePasswordInput.ClientIp` \<*string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `LoginByPhonePasswordInput.Params` \<*string\> 用户自定义数据，你需要先在用户池定义用户自定义数据元信息，且传入值的类型必须和定义的类型匹配
- `LoginByPhonePasswordInput.Context`: \<*string\> 请求上下文，这里设置的 `Context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到
 
#### 示例

- 使用手机号密码登录

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := model.LoginByPhonePasswordInput{
	Code:  "3289",
	Phone: "189xxxx1835",
}
resp, err := authenticationClient.LoginByPhonePassword(req)
```
 
- 登录的同时设置自定义数据

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
data, e := jsoniter.Marshal([]model.KeyValuePair{{Key: "source", Value: "qq"}})
p := string(data)
req := model.LoginByPhonePasswordInput{
	Code:  "3289",
	Phone: "189xxxx1835",
    Params:       &p,
}
resp, err := authenticationClient.LoginByPhonePassword(req)
```

## 使用 LDAP 用户名登录

```go
// LoginByLdap
// 使用 LDAP 用户名登录
func (c *Client) LoginByLdap(username, password string) (*struct {
	Code    int64      `json:"code"`
	Message string     `json:"message"`
	Data    model.User `json:"data"`
}, error)
```

使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息

点此查看[连接 LDAP 身份源](/connections/ldap/)文档

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
resp, err := authenticationClient.LoginByLdap("185xxxx6338", "123456")
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 使用 AD 用户名登录

```go
// LoginByAd
// 使用 AD 用户名登录
func (c *Client) LoginByAd(username, password string) (*struct {
	Code    int64      `json:"code"`
	Message string     `json:"message"`
	Data    model.User `json:"data"`
}, error) 
```

使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息

点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
resp, err := authenticationClient.LoginByAd("185xxxx6338", "123456")
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 获取当前登录的用户信息

```go
// GetCurrentUser
// 获取资源列表
func (c *Client) GetCurrentUser(token *string) (*model.User, error) 
```

获取当前登录用户的用户信息，需要 authenticationClient 当前处于已登录状态才能获取到。你可以通过两种方式设置 authenticationClient 的登录状态：
1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，authentication_client 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态
2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 authentication_client

你也可以手动传入用户的 [id_token](/concepts/id-token.md)，检查其此 `id_token` 的登录状态

#### 参数

- `token` \<*string\> 用户的 [id_token](/concepts/id-token.md)，可选

#### 示例

- 调用登录接口之后获取用户信息

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
req := &model.LoginByPhoneCodeInput{
	Code:  "3289",
	Phone: "189xxxx1835",
}
authenticationClient.LoginByPhoneCode(req)
resp, err := authenticationClient.GetCurrentUser(nil)
```

- 通过用户的 [id_token](/concepts/id-token.md) 获取用户信息

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
token:="xxxxx"
resp, err := authenticationClient.GetCurrentUser(&token)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 退出登录

```go
// Logout
// 退出登录
func (c *Client) Logout() (*model.CommonMessageAndCode, error)
```

用于用户退出登录，会执行以下操作：

1. 清空该用户在当前应用下的 session 会话信息
2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据

#### 示例

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
resp, err := authenticationClient.Logout()
```

#### 返回值

是否退出登录成功

## 发送短信验证码

```go
// SendSmsCode
// 发送短信验证码
func (c *Client) SendSmsCode(phone string) (*struct {
	Message string `json:"message"`
	Code    int64  `json:"code"`
}, error) 
```

发送短信验证码, 目前仅支持国内手机号；该接口有接口频率限制，请勿频繁请求

#### 参数

- `phone` \<string\> 手机号

#### 示例

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
resp, err := authenticationClient.SendSmsCode("189xxxx1835")
```

## 发送邮件

```go
// SendEmail
// 发送邮件
func (c *Client) SendEmail(email string, scene model.EnumEmailScene) (*model.CommonMessageAndCode, error) 
```

主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)

#### 参数

- `email` \<string\> 邮箱
- `scene` \<EnumEmailScene\> 发送场景，可选值包含：
  - EnumEmailSceneResetPassword: 发送重置密码邮件，邮件中包含验证码
  - EnumEmailSceneVerifyEmail: 发送验证邮箱的邮件
  - EnumEmailSceneChangeEmail: 发送修改邮箱邮件，邮件中包含验证码
  - EnumEmailSceneMfaVerify: 发送 MFA 验证邮件
#### 示例

- 发送重置密码邮件，会将包含验证码的邮件发送到用户的邮箱

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool
resp, err := authenticationClient.SendEmail(" mail@qq.com", model.EnumEmailSceneVerifyEmail)
```

- 之后用户可以使用邮箱验证码重置密码


```go
authenticationClient.ResetPasswordByEmailCode(
  "test@example.com",
  "1234",
  "new_passw0rd"
)
```

## 获取自定义数据

```go
// ListUdv
// 获取当前用户的自定义数据列表
func (c *Client) ListUdv() (*[]model.UserDefinedData, error)
```

获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)

#### 示例

```go
	authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginByUsernameInput{
		Username: "185xxxx6338",
		Password: "123456",
	}
	authenticationClient.LoginByUserName(*req)
	resp, err := authenticationClient.ListUdv()
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 设置自定义数据

```go
// SetUdv
// 添加自定义数据
func (c *Client) SetUdv(udvList []model.KeyValuePair) (*[]model.UserDefinedData, error) 
```

设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉

#### 参数

- `udvList` \<[]model.KeyValuePair\> 输入数据，类型为一个字典，详情请见示例

#### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginByUsernameInput{
		Username: "185xxxx6338",
		Password: "123456",
	}
	authenticationClient.LoginByUserName(*req)
	resp, err := authenticationClient.SetUdv([]model.KeyValuePair{
		{Key: "age", Value: "18"},
	})
```

#### 返回值
```json
[{"key":"age","dataType":"NUMBER","value":"18","label":"学校"}]
```

## 删除自定义数据

```go
// RemoveUdv
// 删除自定义数据
func (c *Client) RemoveUdv(key string) (*[]model.UserDefinedData, error) 
```

删除用户的某一个自定义数据

#### 参数

- `key` \<string\> 自定义字段的 key 

#### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginByUsernameInput{
		Username: "185xxxx6338",
		Password: "123456",
	}
	authenticationClient.LoginByUserName(*req)
	resp, err := authenticationClient.RemoveUdv("school")
```

## 检测 Token 登录状态

```go
// CheckLoginStatus
// 检测 Token 登录状态
func (c *Client) CheckLoginStatus(token string) (*model.CheckLoginStatusResponse, error) 
```

检测用户 [id_token](/concepts/id-token.md) 的登录状态

#### 参数

- `token` \<string\> 用户的登录凭证 token

#### 示例

```go
# 检查任意 token 的有效状态
req := &model.LoginByUsernameInput{
	Username: "testGoSDK",
	Password: "123p89",
}
u, e := authenticationClient.LoginByUserName(*req)
resp, err := authenticationClient.CheckLoginStatus(*u.Token)

# 之前调用过登录或者通过 accessToken 初始化
# 检查当前用户的登录状态
authenticationClient.CheckLoginStatus(nil)
```

#### 示例数据

- 成功示例

```json
{
    "code": 200,
    "message": "已登录",
    "status": true,
    "exp": 1620732833,
    "iat": 1619523233
}
```

- 失败示例

```json
{
  "code": 2206,
  "message": "登录信息已过期",
  "status": false,
  "exp": null,
  "iat": null
}
```

## 通过短信验证码重置密码

```go
// ResetPasswordByPhoneCode
// 通过短信验证码重置密码
func (c *Client) ResetPasswordByPhoneCode(phone, code, newPassword string) (*model.CommonMessageAndCode, error)
```

通过短信验证码重置密码，你可以通过 [SendSmsCode](#发送短信验证码) 方法发送短信验证码

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```go
authenticationClient.ResetPasswordByPhoneCode(
  "176xxxx6754",
  "1234",
  "passw0rd"
)
```

## 通过邮件验证码重置密码


```go
// ResetPasswordByEmailCode
// 通过邮件验证码重置密码
func (c *Client) ResetPasswordByEmailCode(email, code, newPassword string) (*model.CommonMessageAndCode, error) 
```

通过邮件验证码重置密码，你需要先调用 [SendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```go
authenticationClient.ResetPasswordByEmailCode(
  "176xxxx6754",
  "1234",
  "passw0rd"
)
```

## 修改用户资料

```go
// UpdateProfile
// 修改用户资料
func (c *Client) UpdateProfile(req *model.UpdateUserInput) (*model.User, error)
```

修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 [UpdatePhone](#更新用户手机号)、[UpdateEmail](#更新用户邮箱)、[UpdatePassword](#更新用户密码) 接口

#### 参数

- `req` \<UpdateUserInput\> 修改的用户资料
- `UpdateUserInput.Username` \<*string\> 用户名
- `UpdateUserInput.Nickname` \<*string\> 昵称
- `UpdateUserInput.Photo` \<*string\> 头像
- `UpdateUserInput.Company` \<*string\> 公司
- `UpdateUserInput.Browser` \<*string\> 浏览器
- `UpdateUserInput.Device` \<*string\> 设备
- `UpdateUserInput.LastIP` \<*string\> 最近登录的 IP
- `UpdateUserInput.Name` \<*string\> Name
- `UpdateUserInput.GivenName` \<*string\> Given Name
- `UpdateUserInput.FamilyName` \<*string\> Family Name
- `UpdateUserInput.MiddleName` \<*string\> Middle Name
- `UpdateUserInput.Profile` \<*string\> Profile Url
- `UpdateUserInput.PreferredUsername` \<*string\> Preferred Name
- `UpdateUserInput.Website` \<*string\> 个人网站
- `UpdateUserInput.Gender` \<*string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `UpdateUserInput.Birthdate` \<*string\> 生日
- `UpdateUserInput.Zoneinfo` \<*string\> 时区
- `UpdateUserInput.Locale` \<*string\> 语言
- `UpdateUserInput.Address` \<*string\> 地址
- `UpdateUserInput.StreetAddress` \<*string\> 街道地址
- `UpdateUserInput.Locality` \<*string\>
- `UpdateUserInput.Region` \<*string\> 地域
- `UpdateUserInput.PostalCode` \<*string\> 邮编
- `UpdateUserInput.City` \<*string\> 城市
- `UpdateUserInput.Province` \<*string\> 省份
- `UpdateUserInput.Country` \<*string\> 国家

#### 示例

- 修改用户名

```go
    username := "goSdkTestUpdateProfile"
	updateReq := &model.UpdateUserInput{
		Username: &username,
	}
	resp1, err := authenticationClient.UpdateProfile(updateReq)
```
 

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 更新用户密码

```go
// UpdatePassword
// 更新用户密码
func (c *Client) UpdatePassword(oldPassword *string, newPassword string) (*model.User, error) 
```

更新用户密码，需要提供原始密码

#### 参数

- `newPassword` \<string\> 新密码
- `oldPassword` \<*string\> 旧密码，如果用户没有设置密码，可以不填

#### 示例

- 由手机号、社会化登录等其他方式注册的，首次没有设置密码，oldPassword 留空

```go
resp, err := authenticationClient.UpdatePassword(nil, "654321")
```

- 用户之前设置了密码

```go
oldPassword := "oldPassword"
resp, err := authenticationClient.UpdatePassword(&oldPassword, "654321")
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 绑定手机号

```go
// BindPhone
// 绑定手机号
func (c *Client) BindPhone(phone, phoneCode string) (*model.User, error) 
```

用户初次绑定手机号，如果需要修改手机号请使用 [UpdatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [SendSmsCode](#发送短信验证码) 方法

终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<string\> 手机号
- `phoneCode` \<string\> 手机号验证码

#### 示例

```go
resp, err := authenticationClient.BindPhone("185xxxx6338", "1453")
```

## 解绑手机号

```go
// UnBindPhone
// 绑定手机号
func (c *Client) UnBindPhone() (*model.User, error) 
```

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误

终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```go
resp, err := authenticationClient.UnBindPhone()
```

#### 返回值

该接口会返回最新的用户信息

- [用户信息](/guides/user/user-profile.md)


## 更新用户手机号

```go
// UpdatePhone
// 更新用户手机号
func (c *Client) UpdatePhone(phone, code string, oldPhone, oldPhoneCode *string) (*model.User, error)
```

更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）

也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号

开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭

![](https://cdn.authing.cn/img/20210414110024.png)

用户首次绑定手机号请使用 [BindPhone](#绑定手机号) 接口

#### 参数

- `phone` \<string\> 新手机号
- `code` \<string\> 新手机号的验证码
- `oldPhone` \<*string\> 旧手机号
- `oldPhoneCode` \<*string\> 旧手机号的验证码

#### 示例

- 关闭了“验证原有手机号“选项

```go
resp, err := authenticationClient.UpdatePhone("185xxxx6338", "7757", nil, nil)
```

- 开启了“验证原有手机号“选项

```go
oldPhone:="158xxxxxxx"
oldCode:="code"
resp, err := authenticationClient.UpdatePhone("185xxxx6338", "7757", &oldPhone, &oldCode)

```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 绑定邮箱

```go
// BindEmail
// 绑定邮箱号
func (c *Client) BindEmail(email, emailCode string) (*model.User, error)
```

用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [UpdateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [SendEmail](#发送邮件) 方法

终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<string\> 邮箱
- `emailCode` \<string\> 邮件验证码，可通过 [SendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL

#### 示例

```go
resp, err := authenticationClient.BindEmail("email", "code")
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

## 解绑邮箱

```go
// UnBindEmail
// 解绑邮箱号
func (c *Client) UnBindEmail() (*model.User, error) 
```

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误

终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```go
resp, err := authenticationClient.UnBindEmail()
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)


## 更新用户邮箱

```go
// UpdateEmail
// 更新用户邮箱
func (c *Client) UpdateEmail(email, code string, oldEmail, oldEmailCode *string) (*model.User, error)
```


如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱

开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭

![](https://cdn.authing.cn/img/20210414105928.png)

用户首次绑定邮箱请使用 [BindEmail](#绑定邮箱) 接口

#### 参数

- `email` \<string\> 新邮箱
- `code` \<string\> 新邮箱的验证码
- `oldEmail` \<*string\> 旧邮箱
- `oldEmailCode` \<*string\> 旧邮箱的验证码

#### 示例

- 关闭了“验证原有邮箱“选项

```go
resp, err := authenticationClient.UpdateEmail("email@qq.com", "7757", nil, nil)
```

- 开启了“验证原有邮箱“选项

```go
oldEmail:="email@qq.com"
oldCode:="code"
resp, err := authenticationClient.UpdateEmail("email@authing.com", "7757", &oldEmail, &oldCode)

```

## 合并账号身份信息


```go
// LinkAccount
// 关联账号
func (c *Client) LinkAccount(primaryUserToken, secondaryUserToken string) (*model.CommonMessageAndCode, error)
```

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `primaryUserToken` \<string\> 主账号 Token
- `secondaryUserToken` \<string\> 子账号 Token

#### 示例

```go
resp, err := authenticationClient.LinkAccount(Token, "qqwe")
```

#### 返回值

- 会返回一个 `bool` 类型的值，表示是否设置成功

<!-- ## 解绑社交账号


```go
// UnLinkAccount
// 主账号解绑社会化登录账号
func (c *Client) UnLinkAccount(primaryUserToken string, provider constant.SocialProviderType) (*model.CommonMessageAndCode, error) 
```

主账号解绑社会化登录账号

#### 参数

- `primaryUserToken` \<string\> 主账号用户的 `id_token`
- `provider` \<SocialProviderType\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)

#### 示例

```go
resp, err := authenticationClient.UnLinkAccount(Token, constant.WECHATPC)
```

#### 返回值

- 会返回一个 `bool` 类型的值，表示是否设置成功 -->

## 获取用户账号安全等级

```go
// GetSecurityLevel
// 用户安全等级
func (c *Client) GetSecurityLevel() (*struct {
	Code    int64                          `json:"code"`
	Message string                         `json:"message"`
	Data    model.GetSecurityLevelResponse `json:"data"`
}, error)
```

获取此账号的账号安全等级

#### 示例

```go
resp, err := authenticationClient.GetSecurityLevel()
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


```go
// ListAuthorizedResources
// 获取用户被授权的所有资源
func (c *Client) ListAuthorizedResources(namespace string, resourceType model.EnumResourceType) (*model.AuthorizedResources, error)
```

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源

#### 参数

- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resourceType` \<EnumResourceType\> 资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据

#### 示例

```go
resp, err := authenticationClient.ListAuthorizedResources("default", model.EnumResourceTypeDATA)
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

```go
// ListApplications
// 获取当前用户能够访问的应用
func (c *Client) ListApplications(page, limit int) (*struct {
	Code    int64  `json:"code"`
	Message string `json:"message"`
	Data    struct {
		TotalCount int64               `json:"totalCount"`
		List       []model.Application `json:"list"`
	} `json:"data"`
}, error)
```

获取当前用户能够访问的应用

#### 参数

-  `page` \<int\> 分页序号, 默认为 `1`
-  `limit` \<int\> 每页返回的个数, 默认为 `10`

#### 示例

```go
resp, err := authenticationClient.ListApplications(1, 10)
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

```go
// CheckPasswordStrength
// 检查密码强度
func (c *Client) CheckPasswordStrength(password string) (*struct {
	Valid   bool   `json:"valid"`
	Message string `json:"message"`
}, error) 
```

检查密码强度，详情请见 [https://docs.authing.co/v2/guides/security/config-password.html](https://docs.authing.co/v2/guides/security/config-password.html)

#### 参数
-  `password` \<string\> 密码
#### 示例

```go
resp, err := authenticationClient.CheckPasswordStrength("12345678")
```

#### 示例数据
```json
{
  "message": "密码验证成功",
  "valid": true
}
```




## 刷新当前用户的 Token

```go
// RefreshToken
// 刷新当前用户的 token
func (c *Client) RefreshToken(token *string) (*model.RefreshToken, error)
```

刷新当前用户的 Token

#### 参数
-  `token` \<*string\> 用户 Token
#### 示例

```go
	authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginByUsernameInput{
		Username: "goSdkTestUpdateProfile",
		Password: "xxx",
	}
	user, _ := authenticationClient.LoginByUserName(*req)
	resp, err := authenticationClient.RefreshToken(user.Token)
```

#### 示例数据
```json
{
  "iat": 1632467937,
  "token": "newToken",
  "exp": 1633677537
}
```
 
## 获取用户所在组织机构

```go
// ListOrg
// 获取用户所在组织机构
func (c *Client) ListOrg() (*struct {
	Code    int64            `json:"code"`
	Message string           `json:"message"`
	Data    []model.UserOrgs `json:"data"`
}, error)
```

获取用户所在组织机构
 
#### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginByUsernameInput{
		Username: "185xxxx6338",
		Password: "123456",
	}
	authenticationClient.LoginByUserName(*req)
	resp, err := authenticationClient.ListOrg()
```

#### 示例数据
```json
[]
```


## 获取用户拥有的角色列表

```go
// ListRole
// 获取用户拥有的角色列表
func (c *Client) ListRole(namespace string) (*struct {
	TotalCount int               `json:"totalCount"`
	List       []model.RoleModel `json:"list"`
}, error) 
```

获取用户拥有的角色列表
#### 参数
- `namespace` \<string\> 命名空间
#### 示例

```go
resp, err := authenticationClient.ListRole("default")
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

```go
// HasRole
// 判断当前用户是否有某个角色
func (c *Client) HasRole(code, namespace string) (*bool, error) 
```

获取用户拥有的角色列表
#### 参数
- `code` \<string\> 角色 Code
- `namespace` \<string\> 命名空间
#### 示例

```go
resp, err := authenticationClient.HasRole("NewCode", "default")
```

#### 示例数据
```go
bool
```

## 登录子账号

```go
// LoginBySubAccount
// 登录子账号
func (c *Client) LoginBySubAccount(req *model.LoginBySubAccountRequest) (*model.User, error)
```

登录子账号
#### 参数

- `req` \<LoginBySubAccountRequest\> 请求
- `LoginBySubAccountRequest.Account` \<string\> 账号
- `LoginBySubAccountRequest.Password` \<string\> 密码
- `LoginBySubAccountRequest.CaptchaCode` \<string\> 验证码
- `LoginBySubAccountRequest.ClientIp` \<string\> 登录客户端 IP
#### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	req := &model.LoginBySubAccountRequest{
		Account:  "123456789",
		Password: "85xx81",
	}
	resp, err := authenticationClient.LoginBySubAccount(req)
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

```go
// ResetPasswordByFirstLoginToken
// 通过首次登录的 Token 重置密码
func (c *Client) ResetPasswordByFirstLoginToken(token, password string) (*model.CommonMessageAndCode, error)
```

通过首次登录的 Token 重置密码
#### 参数
- `token` \<string\> 首次登录的 Token
- `password` \<string\> 密码
 
#### 示例

```go
authentication.ResetPasswordByFirstLoginToken("token",password)
```


## 通过密码强制更新临时 Token 修改密码

```go
// ResetPasswordByForceResetToken
// 通过密码强制更新临时 Token 修改密码
func (c *Client) ResetPasswordByForceResetToken(token, password, newPassword string) (*model.CommonMessageAndCode, error)
```

通过密码强制更新临时 Token 修改密码
#### 参数
- `token` \<string\> 首次登录的 Token
- `password` \<string\> 旧密码
- `newPassword` \<string\> 新密码
#### 示例

```go
authentication.ResetPasswordByForceResetToken("token",password,newPassword)
```


## 获取用户所有部门

```go
// ListDepartments
// 获取用户所有部门
func (c *Client) ListDepartments() (*model.PaginatedDepartments, error) 
```

获取用户所有部门
 
#### 示例

```go
resp, err := authenticationClient.ListDepartments()
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

```go
// IsUserExists
// 判断用户是否存在
func (c *Client) IsUserExists(req *model.IsUserExistsRequest) (*bool, error)
```

判断用户是否存在
#### 参数
- `req` \<IsUserExistsRequest\> 请求
- `IsUserExistsRequest.Username` \<*string\> 用户名
- `IsUserExistsRequest.Email`  \<*string\> 邮箱
- `IsUserExistsRequest.Phone`  \<*string\> 电话
- `IsUserExistsRequest.ExternalId`  \<*string\> 数据源ID
#### 示例

```go
userName := "185xxxx6338"
resp, err := authenticationClient.IsUserExists(&model.IsUserExistsRequest{
		Username: &userName,
})
```
#### 示例数据
```go
bool
```


## 通过远端服务验证票据合法性

```go
// ValidateTicketV2
// 通过远端服务验证票据合法性
func (c *Client) ValidateTicketV2(ticket, service string, format constant.TicketFormat) (*struct {
	Code    int64       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}, error)
```

通过远端服务验证票据合法性
#### 参数
- `ticket` \<string\> 票据
- `service`  \<string\> 验证服务地址
- `format`  \<TicketFormat\> 数据格式 取值仅 XML,JSON
 
#### 示例

```go
resp, err := authenticationClient.ValidateTicketV2("ss", "http://localhost:3000", constant.XML)
```



## SSO 检测登录态

```go
// TrackSession
// sso 检测登录态
func (c *Client) TrackSession(code string, country, lang, state *string) (*struct {
	Code    int64       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}, error)
```

SSO 检测登录态
 

#### 示例

```go
authentication.TrackSession("cccq","bj",nil)
```

#### 示例数据
```json
{"session": null}
```
