---
meta:
- name: description
  content: 用户认证模块
---
# 用户认证模块

<LastUpdated/>

> 此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。

```csharp
using Authing.ApiClient;

var managementClient = new managementClient(
  opt =>
        {
          opt.AppId = "AUTHING_APP_ID",
          opt.AppHost: 'https://xxx.authing.cn',
        }
);
```

## 文档相关说明
- 我们尽可能在代码相关文档提供足够关键的信息来协助开发者方便，快捷完成功能实现。
- 针对绝大多数函数中，可能都具有一个 CancellationToken 类型的 cancellationToken 参数，这赋予使用者管理内部函数请求的能力，默认是 `default`，考虑到绝大多数函数中都有，又默认可空，开发者在开发过程中非常容易获得相关函数信息，固不在每个函数中进行说明。
- 建议使用罗列出的函数，当然在你调用不建议使用的函数的同时，你会在函数说明看到相关不建议使用的信息。

## 使用邮箱注册

```csharp
managementClient.RegisterByEmail(string email, string password, RegisterProfile profile = null, RegisterAndLoginOptions options = null)
```

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<RegisterAndLoginOptions\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.generateToken` \<boolean\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<KeyValueDictionary[]\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```csharp
var email = "test@example.com";
var password = "123456";
var user = await managementClient.RegisterByEmail(email, password);
```

## 使用用户名注册

```csharp
managementClient.RegisterByUsername(string username, string password, RegisterProfile profile = null, RegisterAndLoginOptions options = null)
```

使用用户名注册

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<RegisterAndLoginOptions\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.generateToken` \<boolean\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<KeyValueDictionary[]\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```csharp
var username = "test";
var password = "123456";
var user = await managementClient.RegisterByUsername(email, password);
```

## 使用手机号注册

```csharp
managementClient.RegisterByPhoneCode(string phone, string code, string password = null, RegisterProfile profile = null, RegisterAndLoginOptions options = null)
```

使用手机号注册，你可以同时设置该账号的初始密码。发送短信的接口请见 [sendSmsCode](#发送短信验证码)

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 短信验证码
- `password` \<string\> 初始密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<RegisterAndLoginOptions\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.generateToken` \<boolean\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<KeyValueDictionary[]\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var user = await managementClient.RegisterByPhoneCode(phone, code, password);
```

## 使用邮箱登录

```csharp
managementClient.LoginByEmail(string email, string  password, RegisterAndLoginOptions options = null)
```

使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。

![](https://cdn.authing.cn/img/20210414145613.png)

如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `options` \<RegisterAndLoginOptions\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.generateToken` \<boolean\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<KeyValueDictionary[]\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `options.captchaCode` \<string\> 图形验证码。

#### 示例

```csharp
var email = "test@example.com";
var password = "123456";
var user = await managementClient.LoginByEmail(email, password);
```

## 使用用户名登录

```csharp
managementClient.LoginByUsername(string username, string password, RegisterAndLoginOptions options = null)
```

使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `options` \<RegisterAndLoginOptions\>
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.autoRegister` \<boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `options.captchaCode` \<string\> 图形验证码。

#### 示例

```csharp
var username = "username";
var password = "123456";
var user = await managementClient.LoginByUsername(username, password);
```

## 使用手机号验证码登录

```csharp
managementClient.LoginByPhoneCode(string phone, string  code, RegisterAndLoginOptions options = null)
```

使用手机号验证码登录。你需要先使用 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 短信验证码
- `options` \<RegisterAndLoginOptions\>
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.autoRegister` \<boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `param.captchaCode` \<string\> 图形验证码。

#### 示例

```csharp
var phone = "phone number";
var code = "1234";
var user = await managementClient.LoginByPhoneCode(phone, code);
```

## 使用手机号密码登录

```csharp
managementClient.LoginByPhonePassword(string phone, string password, RegisterAndLoginOptions options = null)
```

如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `phone` \<string\> 手机号
- `password` \<string\> 密码
- `options` \<RegisterAndLoginOptions\>
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.autoRegister` \<bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `options.context` \<Dictionary<string, object>[]\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `param.captchaCode` \<string\> 图形验证码。

#### 示例

```csharp
var phone = "phone number";
var password = "123456";
var user = await managementClient.LoginByPhonePassword("phone", "password");
```

## 使用子账户登录

```csharp
managementClient.LoginBySubAccount(string account, string password, RegisterAndLoginOptions options = null)
```

使用子账户登录。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `options` \<RegisterAndLoginOptions\> 配置对象，可选参数。
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。

#### 示例

```csharp
var account = "account";
var password = "1234";
var user = await managementClient.LoginBySubAccount(phone,  code);
```

## 使用 LDAP 用户名登录

```csharp
managementClient.LoginByLdap(string username, string password,)
```

使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。

点此查看[连接 LDAP 身份源](/connections/ldap/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```csharp
var user = await managementClient.LoginByLdap("username", "password");
```

## 使用 AD 用户名登录

```csharp
managementClient.LoginByAd(string username, string password)
```

使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。
点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档。

点此查看[连接 LDAP 身份源](/connections/ldap/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```csharp
var user = await managementClient.LoginByAd("admin", "admin");
```

## 获取当前登录的用户信息

```csharp
managementClient.GetCurrentUser()
```

获取当前登录用户的用户信息，需要 managementClient 当前处于已登录状态才能获取到。你可以通过两种方式设置 managementClient 的登录状态：

1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，managementClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态；
2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 managementClient。

#### 示例

```csharp
var user = await managementClient.GetCurrentUser();
```
## 判断是否登录
```csharp
   managementClient.CheckLoggedIn()
```
> 判断是否登录
> 1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，managementClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态。
> 2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 managementClient。
> 3. 依据是否已经缓存用户的登录状态来判断是否登录。
#### 示例

```csharp
 managementClient.CheckLoggedIn();
```

## 获取当前用户的自定义数据列表

```csharp
managementClient.ListUdv()
```

> 获取当前用户的自定义数据列表 需要用户先登录
#### 参数

无

#### 示例

```csharp
managementClient.ListUdv()
```

## 添加用户自定义数据

```csharp
managementClient.SetUdv(string key, object value)
```

> 添加用户自定义数据 需要用户先登录

#### 参数

- `key` \<string\> 自定义数据的 Key
- `value` \<object\> 自定义数据的 Value

#### 示例

```csharp
managementClient.SetUdv("key", "value)
```
## 获取用户所在组织机构数据列表

```csharp
managementClient.ListOrgs(string userId)
```

> 获取用户所在组织机构数据列表 需要用户先登录


#### 示例

```csharp
managementClient.ListOrgs("userId")
```



## 设置当前用户信息

```csharp
managementClient.SetCurrentUser(User user)
```
#### 参数

- `User` \<User\> 
- `User.Id` \<string\>  用户 ID
- `User.UserPoolId` \<string\>  用户池 ID
- `User.Username` \<string\>  用户名，用户池内唯一
- `User.Email` \<string\>  邮箱，用户池内唯一
- `User.EmailVerified` \<string\>  邮箱是否已验证
- `User.Phone` \<bool\>  手机号，用户池内唯一
- `User.PhoneVerified` \<bool\> 手机号是否已验证
- `User.Unionid` \<string\> 
- `User.Openid` \<string\> 
- `User.Nickname` \<string\> 昵称，该字段不唯一
- `User.RegisterSource` \<List\<string\>\> 
- `User.Photo` \<string\> 头像链接，默认为 https://usercontents.authing.cn/authing-avatar.png
- `User.Password` \<string\>  用户密码，数据库使用密钥加 salt 进行加密，非原文密码。
- `User.Oauth` \<string\> 用户社会化登录第三方身份提供商返回的原始用户信息，非社会化登录方式注册的用户此字段为空
- `User.Token` \<string\>  用户登录凭证，开发者可以在后端检验该 token 的合法性，从而验证用户身份。详细文档请见：[验证 Token](https://authing-open-api.readme.io/reference/nodejs)
- `User.TokenExpiredAt` \<string\> token 过期时间
- `User.LoginsCount` \<string\>  用户登录总次数份。详细文档请见：[验证 Token](https://authing-open-api.readme.io/reference/nodejs)
- `User.LastIp` \<string\> 用户上一次登录时使用的 IP
- `User.SignedUp` \<string\> 用户注册时间
- `User.Blocked` \<bool\> 该账号是否被禁用
- `User.IsDeleted` \<bool\> 账号是否被软删除

#### 示例
```csharp
var user = new User(){
  Id = "Id"
  UserPoolId = "UserPoolId"
}
managementClient.SetCurrentUser(user)
```
## 设置当前 AccessToken

```csharp
managementClient.SetToken(string token)
```
#### 参数
- `token` \<string\> 用户 ID


> 获取用户所在组织机构数据列表 需要用户先登录


#### 示例

```csharp
managementClient.SetToken("TOKEN")
```
## 设置当前用户信息获取用户所在组织机构数据列表

```csharp
managementClient.ListOrgs(string userId)
```
#### 参数
- `userId` \<string\> 用户 ID


> 获取用户所在组织机构数据列表 需要用户先登录


#### 示例

```csharp
managementClient.ListOrgs("userId")
```

## 退出登录

```csharp
managementClient.Logout(LogoutParam logoutParam)
```

> 用于用户退出登录

1. 清空该用户在当前应用下的 session 会话信息；
2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据。

#### 参数

- `LogoutParam.AppId` \<string\> App id
- `logoutParam.UserId` \<string\> 用户id

#### 示例

```csharp
var option = new LogoutParam(){
  AppId = "AppId",
  UserId = "UserId"
}
await managementClient.Logout(option);
```

## 发送短信验证码

```csharp
managementClient.SendSmsCode(string phone)
```

> 发送短信验证码, 短信验证码的有效时间为 60 s。

#### 参数

- `phone` \<string\>

#### 示例

```csharp
var phone = "phone number";
await managementClient.SendSmsCode(phone);
```

## 发送邮件

```csharp
managementClient.SendEmail(string email, EmailScene scene)
```

主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)。

#### 参数

- `email` \<string\> 邮箱
- `scene` \<EmailScene\> 发送场景，可选值为 RESET_PASSWORD（发送重置密码邮件，邮件中包含验证码）、VERIFY_EMAIL（发送验证邮箱的邮件）、CHANGE_EMAIL（发送修改邮箱邮件，邮件中包含验证码）
  - `RESET_PASSWORD`: 发送重置密码邮件，邮件中包含验证码；
  - `VERIFY_EMAIL`: 发送验证邮箱的邮件；
  - `CHANGE_EMAIL`: 发送修改邮箱邮件，邮件中包含验证码；
  - `MFA_VERIFY`: 发送 MFA 验证邮件。

#### 示例

```csharp
using Authing.ApiClient.Types;
var message = await managementClient.SendEmail("test@example.com", EmailScene.RESET_PASSWORD);
```

## 获取自定义数据

```csharp
managementClient.GetUdfValue()
```

获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 示例

```csharp
var udfValue = await managementClient.GetUdfValue();
```

## 设置自定义数据

```csharp
managementClient.SetUdfValue(KeyValueDictionary data)
```

设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `data` \<KeyValueDictionary\> 输入数据，类型为一个对象，详情请见示例。

#### 示例

```csharp
var data = new KeyValueDictionary()
{
  {
    key: "your key1",
    value: "your value2"
  },
  {
    key: "your key1",
    value: "your value2"
  },
};
var udfValue = await managementClient.SetUdfValue(data);
```

## 删除自定义数据

```csharp
managementClient.RemoveUdfValue(string key);
```

> 删除自定义数据。

#### 参数

- `key` \<string\> 自定义字段的 key 。

#### 示例

```csharp
var key = "key";
var flag = await managementClient.RemoveUdfValue(key);
```

## 检测 Token 登录状态

```csharp
managementClient.CheckLoginStatus(string token)
```

#### 参数

- `token` \<string\> 用户的登录凭证 token

#### 示例

```csharp
var token = "TOKEN";
var status = await managementClient.CheckLoginStatus(token);
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

```csharp
managementClient.ResetPasswordByPhoneCode(string phone, string code, string newPassword)
```

> 通过短信验证码重置密码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。


#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var message = await managementClient.ResetPasswordByPhoneCode(phone, code, password);
```

## 通过邮件验证码重置密码

```csharp
managementClient.ResetPasswordByEmailCode(string phone, string code, string newPassword)
```

> 通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```csharp
var email = "test@example.com";
var code = "1234";
var password = "123456";
var message = await managementClient.ResetPasswordByEmailCode(email, code, password);
```

## 修改用户资料

```csharp
managementClient.UpdateProfile(UpdateUserInput updates)
```

修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 [updatePhone](#更新用户手机号)、[updateEmail](#更新用户邮箱)、[updatePassword](#更新用户密码) 接口。

#### 参数

- `updates` \<UpdateUserInput\> 修改的用户资料
- `updates.username` \<string\> 用户名
- `updates.nickname` \<string\> 昵称
- `updates.photo` \<string\> 头像
- `updates.company` \<string\> 公司
- `updates.browser` \<string\> 浏览器
- `updates.device` \<string\> 设备
- `updates.lastIP` \<string\> 最近登录的 IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> 个人网站
- `updates.gender` \<string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `updates.birthdate` \<string\> 生日
- `updates.zoneinfo` \<string\> 时区
- `updates.locale` \<string\> 语言
- `updates.address` \<string\> 地址
- `updates.streetAddress` \<string\> 街道地址
- `updates.locality` \<string\>
- `updates.region` \<string\> 地域
- `updates.postalCode` \<string\> 邮编
- `updates.city` \<string\> 城市
- `updates.province` \<string\> 省份
- `updates.country` \<string\> 国家

#### 示例

```csharp
var user = await managementClient.UpdateProfile
(
  new UpdateUserInput()
  {
    Nickname = "nickname",
    username = "username"
  }
);
```

## 更新用户密码

```csharp
managementClient.UpdatePassword(string newPassword, string oldPassword)
```

> 更新用户密码

#### 参数

- `newPassword` \<string\> 新密码
- `oldPassword` \<string\> 旧密码，如果用户没有设置密码，可以不填。

#### 示例

```csharp
var oldPassword = "111111";
var newPassword = "123456";
await managementClient.UpdatePassword(newPassword, oldPassword);
```

## 绑定手机号

```csharp
managementClient.BindPhone(string phone, string phoneCode)
```

用户初次绑定手机号，如果需要修改手机号请使用 [updatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [sendSmsCode](#发送短信验证码) 方法。

终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<string\>
- `phoneCode` \<string\>

#### 示例

```csharp
var phone = "phone number";
var phoneCode = "1234"
await managementClient.BindPhone(phone, phoneCode);
```

## 解绑手机号

```csharp
managementClient.UnbindPhone(CancellationToken cancellationToken = default);
```

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

> 终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)


#### 示例

```csharp
var user = await managementClient.UnbindPhone("CancellationToken");
```

## 更新用户手机号

```csharp
managementClient.UpdatePhone(string phone, string phoneCode, string oldPhone = null, string oldPhoneCode = null)
```

更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。 开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。

![](https://cdn.authing.cn/img/20210414110024.png)

用户首次绑定手机号请使用 [bindPhone](#绑定手机号) 接口。

#### 参数

- `phone` \<string\> 新手机号
- `phoneCode` \<string\> 新手机号的验证码
- `oldPhone` \<string\> 旧手机号
- `oldPhoneCode` \<string\> 旧手机号的验证码

#### 示例

```csharp
await managementClient.UpdatePhone("newPhone", "newPhoneCode");
```

## 绑定邮箱

```csharp
managementClient.BindEmail(string email, string emailCode)
```

> 用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [updateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [sendEmail](#发送邮件) 方法。
> 终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<string\> 邮箱
- `emailCode` \<string\> 邮件验证码，可通过 [sendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL。

#### 示例

```csharp
var user = await managementClient.BindEmail("demo@authing.cn", "1234");
```

## 解绑邮箱

```csharp
managementClient.UnbindEmail()
```

> 用户解绑手机号，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

> 终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)


#### 示例

```csharp
var user = await managementClient.UnbindEmail();
```

## 更新用户邮箱

```csharp
managementClient.UpdateEmail(string email, string emailCode, string oldEmail = null, string oldEmailCode = null)
```

managementClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。

![](https://cdn.authing.cn/img/20210414105928.png)

用户首次绑定邮箱请使用 [bindEmail](#绑定邮箱) 接口。

#### 参数

- `email` \<string\> 新邮箱
- `emailCode` \<string\> 新邮箱的验证码
- `oldEmail` \<string\> 旧邮箱
- `oldEmailCode` \<string\> 旧邮箱的验证码

#### 示例

```csharp
var newEmail = "new@example.com";
var emailCode = "1234"
await managementClient.UpdateEmail(newEmail, emailCode);
```

## 刷新当前用户的 token

```csharp
managementClient.RefreshToken()
```

> 刷新当前用户的 token，调用此接口要求先登录。

#### 示例

```csharp
managementClient.RefreshToken()
```

## 合并账号身份信息

```csharp
managementClient.LinkAccount(string primaryUserToken, string secondaryUserToken)
```

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `primaryUserToken` \<string\> 主账号 Token
- `secondaryUserToken` \<string\> 子账号 Token

#### 示例

```csharp
var primaryUserToken = "test";
var secondaryUserToken = "test";
var message = await managementClient.LinkAccount(primaryUserToken, secondaryUserToken);
```

<!-- ## 解绑社交账号

```csharp
managementClient.UnLinkAccount(string primaryUserToken, ProviderType provider)
```

主账号解绑社会化登录账号。

#### 参数

- `primaryUserToken` \<string\> 主账号用户的 `id_token`；
- `provider` \<ProviderType\> 支持的社会化登录类型 枚举

#### 示例

```csharp
await managementClient.unLinkAccount(
    "primaryUserToken", ProviderType.QQ
);
``` -->

## 检查密码强度

```csharp
managementClient.CheckPasswordStrength(string password)
```

> 检查密码强度，[点此查看详情](/guides/security/config-password.md)。

判断密码是否符合密码强度要求。{{$localeConfig.brandName}} 中密码强度等级分为以下几种：

- 任意非空字符串；
- 至少 6 位字符；
- 至少 6 位字符，且须包含英文、数字与符号中的两种；
- 至少 6 位字符，且密码中须包含英文、数字与符号。

#### 参数

- `password` \<string\> 密码

#### 示例

```csharp
var result = await managementClient.CheckPasswordStrength("******");
```

## 计算密码安全等级

```csharp
managementClient.ComputedPasswordSecurityLevel(string password)
```

> 计算密码安全等级。

#### 参数

- `password`: 需要计算的密码（明文格式），必须为 `string` 类型；

#### 示例

```csharp
var securityLevel = managementClient.ComputedPasswordSecurityLevel(
  "xxxxxxxx"
);
```

## 获取用户账号安全等级

```csharp
managementClient.GetSecurityLevel(CancellationToken cancellationToken)
```

> 获取用户账号安全等级。

#### 示例

```csharp
var result = managementClient.GetSecurityLevel("cancellationToken");
```

## 获取当前用户能够访问的应用

```csharp
managementClient.ListApplications(ListParams _params = null)
```

> 获取当前用户能够访问的应用。

#### 参数

- `_params`\<ListParams\>，选填
- `_params.Page` \<int\> 分页序号, 默认为 1。
- `_params.Limit` \<int\> 每页返回的个数, 默认为 10。

#### 示例

```csharp
var resData = await managementClient.ListApplications(
  new ListParams()
  {
    Page = 1,
    Limit =  10,
  }
);
```

## 获取用户被授权的所有资源列表

```csharp
managementClient.ListAuthorizedResources(string namespace)
```

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```csharp
var res = managementClient.ListAuthorizedResources("namespace");
```
## 生成一个 PKCE 校验码

```csharp
managementClient.GenerateCodeChallenge()
```
> 生成一个 PKCE 校验码，长度必须大于等于 43

## 生成一个 PKCE 校验码摘要值

```csharp
managementClient.GetCodeChallengeDigest("param")
```

> 生成一个 PKCE 校验码摘要值

#### 参数

- `param` \<CodeChallengeDigestParam\> PKCE 校验码、摘要算法参数
- `param.codeChallenge` \<string\> 待生成摘要值的 code_challenge 原始值，一个长度大于等于 43 的随机字符串。
- `param.method` \<string\> 可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法原样返回，S256 表示使用 SHA256 计算 code_challenge 摘要。

## 判断当前用户是否有某个角色
```csharp
managementClient.hasRole(string userId, string roleCode, string  _namespace = null)
```
> 判断当前用户是否有某个角色

#### 参数

- `roleCode` \<string\> 角色编码 Code
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `_namespace` \<string\> 权限分组 ID


#### 示例

```csharp
managementClient.hasRole("roleCode", "default");
```
## 判断用户是否存在

```csharp
managementClient.Exists(ExistsOption options)
```
> 判断用户是否存在

#### 参数

- `options.username` \<string\> 用户名
- `options.email` \<string\> 用户邮箱
- `options.phone` \<string\> 用户手机号
- `options.externalId` \<string\> 用户外部 Id

#### 示例

```csharp
  managementClient.Exists("username", "email", "phone", "externalId")
```

## 检验 CAS 1.0 Ticket 合法性

```csharp
managementClient.ValidateTicketV1(ticket, service)
```
> 检验 CAS 1.0 Ticket 合法性

#### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址


#### 示例

```csharp
  managementClient.validateTicketV1("ticket", "service");
```

## 获取当前用户

```csharp
managementClient.GetCurrentUser( string token)
```
#### 参数
- `token` \<string\> 用户 ID

#### 示例

```csharp
managementClient.GetCurrentUser("token")
```
## 通过首次登录的 Token 重置密码

```csharp
managementClient.ResetPasswordByFirstLoginToken(string token, string password)
                                                
```
#### 参数
- `token` \<string\> 登录的Token
- `password` \<string\> 密码
#### 示例

```csharp
managementClient.ResetPasswordByFirstLoginToken("token","password")
```

## 通过密码强制跟临时 Token 修改密码

```csharp
managementClient.ResetPasswordByForceResetToken(string token, string oldPassword, string newPassword)
                                                
```
#### 参数
- `token` \<string\> 登录的Token
- `oldPassword` \<string\> 旧密码
- `newPassword` \<string\> 新密码
#### 示例

```csharp
managementClient.ResetPasswordByFirstLoginToken("token","old_password","new_password")
```
## 移除用户自定义字段的值

```csharp
managementClient.RemoveUdv(string key)
```

> 移除用户自定义字段的值

#### 参数

- `key` \<string\> 自定义字段的 key 。

#### 示例

```csharp
var flag = await managementClient.RemoveUdv("key");
```

## 获取当前用户所有部门

```csharp
managementClient.ListDepartment()
```

#### 示例

```csharp
var result = await managementClient.ListDepartment();
```
## 判断用户是否存在

```csharp
managementClient.IsUserExists(string userName = null, string email = null, string phone = null, string externalId = null)
                                                
```
#### 参数
- `userName` \<string\> 用户名
- `email` \<string\> 邮箱
- `phone` \<string\> 手机号
- `externalId` \<string\> externalId
#### 示例

```csharp
managementClient.IsUserExists("userName","email")
```

## 检测密码是否合法

```csharp
managementClient.isPasswordValid(string password)
                                                
```
#### 参数

- `password` \<string\> 密码
#### 示例

```csharp
managementClient.isPasswordValid("password")
```

## 通过微信登录

```csharp
managementClient.LoginByWechat(string code)
```
#### 参数

- `code` \<string\> code
                                    
#### 示例

```csharp
managementClient.LoginByWechat("code")
```
## 获取Token

```csharp
managementClient.GetToken()
```
#### 示例

```csharp
managementClient.GetToken()
```