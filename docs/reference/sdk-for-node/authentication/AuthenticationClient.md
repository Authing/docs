# 认证核心模块

<LastUpdated/>

此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。如果你倾向于以管理员的身份管理用户，请使用 [UsersManagementClient - 用户管理模块](../management/UsersManagementClient.md)。

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.registerByEmail // 使用邮箱注册
authenticationClient.loginByEmail // 使用邮箱登录
```

## 使用邮箱注册
```javascript
AuthenticationClient().registerByEmail(email, password, profile, options)
```

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

- 使用邮箱密码注册

```javascript
authenticationClient.registerByEmail('test@example.com', 'passw0rd')
```

- 注册的同时设置用户信息（昵称和公司）

```javascript
authenticationClient.registerByEmail(
  'test@example.com',
  'passw0rd',
  {
    nickname: 'Nick',
    company: '蒸汽记忆'
  },
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段。

```js
authenticationClient.registerByEmail(
  'test@example.com',
  'passw0rd',
  null,
  {
    customData: {
      source: 'google'
    }
  }
)
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用用户名注册

```js
AuthenticationClient().registerByUsername(username, password, profile, options)
```

使用用户名注册，用户名区分大小写且用户池内唯一。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

- 使用用户名密码注册

```javascript
authenticationClient.registerByUsername('bob', 'passw0rd')
```

- 注册的同时设置用户信息（昵称和公司）

```javascript
authenticationClient.registerByUsername(
  'bob',
  'passw0rd',
  {
    nickname: 'Nick',
    company: '蒸汽记忆'
  },
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段。

```js
authenticationClient.registerByUsername(
  'bob',
  'passw0rd',
  null,
  {
    customData: {
      source: 'google'
    }
  }
)
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用手机号注册
```js
AuthenticationClient().registerByPhoneCode(phone, code, password, profile, options)
```

使用手机号注册，你可以同时设置该账号的初始密码。你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 短信验证码
- `password` \<string\> 初始密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `options.phoneCountryCode` \<string\> 国际区号，例：+1 。 注意区号格式；


#### 示例

- 使用手机号验证码注册

```javascript
authenticationClient.registerByPhoneCode('176xxxx6754', '1234')

// 国外号码
authenticationClient.registerByPhoneCode(
  '788xxxx637',
  '1234',
  null,
  null,
  {
    phoneCountryCode: '+44'
  }
);
```

- 注册的同时设置密码

```javascript
authenticationClient.registerByPhoneCode(
  '176xxxx6754',
  '1234',
  'passw0rd',
  {
    nickname: 'Nick',
    company: '蒸汽记忆'
  }
)
```

- 注册的同时设置用户资料（昵称和公司）

```javascript
authenticationClient.registerByPhoneCode(
  '176xxxx6754',
  '1234',
  null,
  {
    nickname: 'Nick',
    company: '蒸汽记忆'
  }
)
```

- 注册的同时添加设置自定义数据，你需要先给用户定义一个 `source` 自定义字段。

```javascript
authenticationClient.registerByPhoneCode(
  '176xxxx6754',
  '1234',
  null,
  null,
  {
    customData: {
      source: 'google'
    }
  }
)
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用邮箱登录
```js
AuthenticationClient().loginByEmail(email, password, options)
```

使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `options` \<object\>
- `options.autoRegister` \<boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。


#### 示例

- 使用邮箱密码登录

```javascript
authenticationClient.loginByEmail('test@example.com', 'passw0rd')
```

- 屡次登录失败，当需要输入图形验证码时

```javascript
try {
  await authenticationClient.loginByEmail('test@example.com', 'passw0rd')
} catch (error) {
  const { code, message } = error
  if (code === 2000) {
    await authenticationClient.loginByEmail('test@example.com', 'passw0rd', {
      captchaCode: 'xj72',
    })
  }
}
```

- 登录的同时设置自定义字段

```javascript
authenticationClient.loginByEmail(
 'test@example.com',
 'passw0rd',
 {
   customData: {
     source: 'google'
   }
 }
)
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用用户名登录
```js
AuthenticationClient().loginByUsername(username, password, options)
```

使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `options` \<object\>
- `options.autoRegister` \<boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

- 使用用户名、密码登录

```javascript
authenticationClient.loginByUsername('test', 'passw0rd')
```

- 屡次登录失败，当需要输入图形验证码时

```javascript
try {
  await authenticationClient.loginByUsername('test', 'passw0rd')
} catch (error) {
  const { code, message } = error
  if (code === 2000) {
    await authenticationClient.loginByUsername(
      'test',
      'passw0rd',
      {
        captchaCode: 'xj72'
      }
    )
  }
}
```

- 登录的同时设置自定义字段

```javascript
authenticationClient.loginByUsername(
 'test',
 'passw0rd',
 {
   customData: {
     source: 'google'
   }
 }
)
```


#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用手机号验证码登录

AuthenticationClient().loginByPhoneCode(phone, code)

使用手机号验证码登录。你需要先使用 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号；
- `code` \<string\> 短信验证码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码；
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `options.phoneCountryCode` \<string\> 国际区号，例：+1 。 注意区号格式；

#### 示例

- 使用手机号验证码登录

```javascript
authenticationClient.loginByPhoneCode('176xxxx6754', '1234')
// 国外号码
authenticationClient.loginByPhoneCode("788xxxx637", "1234", { phoneCountryCode: '+44' });

```

- 登录的同时传递终端用户的真实 IP 地址（纯在后端与 Authing 交互的场景）

```javascript
authenticationClient.loginByPhoneCode('176xxxx6754', '1234', {
  clientIp: '1.1.1.1'
})
```

- 登录的同时设置自定义数据

```javascript
authenticationClient.loginByPhoneCode(
 '176xxxx6754',
 '1234',
 {
   customData: {
     source: 'google'
   }
 }
)
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用手机号密码登录
```js
AuthenticationClient().loginByPhonePassword(phone, password, options)
```

如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `phone` \<string\> 手机号
- `password` \<string\> 密码
- `options` \<object\>
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。


#### 示例

- 使用手机号密码登录

```javascript
authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd')
```

- 屡次登录失败，当需要输入图形验证码时

```javascript
try {
  await authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd')
} catch (error) {
  const { code, message } = error
  if (code === 2000) {
    await authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd', {
      captchaCode: 'xj72',
    })
  }
}
```

- 登录的同时设置自定义数据

```javascript
authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd', {
  customData: {
    source: 'google'
  },
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用子账户登录
```js
AuthenticationClient().loginBySubAccount(account, password, options)
```

使用子账户登录。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `options` \<object\> 配置对象，可选参数。
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginBySubAccount('admin', 'admin')
```

## 使用 LDAP 用户名登录
```js
AuthenticationClient().loginByLdap(username, password)
```

使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。

点此查看[连接 LDAP 身份源](/connections/ldap/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginByLdap('admin', 'admin')
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 使用 AD 用户名登录
```js
AuthenticationClient().loginByAd(username, password)
```

使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。

点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginByAd('admin', 'admin')
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 获取当前登录的用户信息
```js
AuthenticationClient().getCurrentUser()
```

获取当前登录用户的用户信息，需要 AuthenticationClient 当前处于已登录状态才能获取到。你可以通过两种方式设置 AuthenticationClient 的登录状态：
1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，AuthenticationClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态；
2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 AuthenticationClient。

#### 示例

- 调用登录接口之后获取用户信息

```javascript
const { AuthenticationClient } = require('authing-js-sdk')

const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginByUsername('bob', 'passw0rd').then(() => {
  authenticationClient.getCurrentUser().then(user => {
    console.log(user)
  })
})
```

- 通过用户的 [id_token](/concepts/id-token.md) 初始化之后获取用户信息


```javascript
const { AuthenticationClient } = require('authing-js-sdk')

const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN'
})

authenticationClient.getCurrentUser().then(user => {
  console.log(user)
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 退出登录
```js
AuthenticationClient().logout()
```

用于用户退出登录。

如果在前端浏览器环境下使用，会执行以下操作：

1. 清空 localStorage 中保存的的用户信息和用户的 `id_token`；
2. 清空用户在 appHost 域名下的 session；
3. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据。

如果在后端服务器环境下使用，会执行以下操作：

1. 清空该用户在当前应用下的 session 会话信息；
2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN'
})

authenticationClient.logout()
```

## 发送短信验证码
```js
AuthenticationClient().sendSmsCode(phone)
```

发送短信验证码, 支持国内外手机号；该接口有接口频率限制，请勿频繁请求。

#### 参数

- `phone` \<string\>
- `phoneCountryCode` \<string\> 国际区号，例：+1 。 注意区号格式；
#### 示例

```javascript
authenticationClient.sendSmsCode('176xxxx6754')

// 发国际短信
authenticationClient.sendSmsCode("788xxxx637", "+44")
```

#### 返回值

- `Promise<CommonMessage>`

## 发送邮件
```js
AuthenticationClient().sendEmail(email, scene)
```

主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)。

#### 参数

- `email` \<string\> 邮箱
- `scene` \<EmailScene\> 发送场景，可选值包含：
  - RESET_PASSWORD_VERIFY_CODE: 发送重置密码验证码邮件；
  - FIRST_EMAIL_LOGIN_VERIFY: 发送首次邮箱登录验证邮件；
  - CONSOLE_CONDUCTED_VERIFY: 发送控制台发起的验证邮件；
  - EMAIL_BIND_VERIFY_CODE: 发送邮箱绑定验证码邮件；
  - EMAIL_UNBIND_VERIFY_CODE: 发送邮箱解绑验证码邮件；
  - REGISTER_VERIFY_CODE: 发送注册验证码邮件；
  - LOGIN_VERIFY_CODE: 发送登录验证码邮件；
  - MFA_VERIFY_CODE: 发送 MFA 验证码邮件；
  - INFORMATION_COMPLETION_VERIFY_CODE: 发送信息补全验证码邮件；

#### 示例

- 发送重置密码邮件，会将包含验证码的邮件发送到用户的邮箱

```javascript
import { EmailScene } from 'authing-js-sdk'

authenticationClient.sendEmail('test@example.com', EmailScene.ResetPassword)
```

- 之后用户可以使用邮箱验证码重置密码

```js
authenticationClient.resetPasswordByEmailCode(
  'test@example.com',
  '1234',
  'newPassw0rd'
)
```

## 检查密码强度
```js
AuthenticationClient().checkPasswordStrength(password)
```

判断密码是否符合密码强度要求。{{$localeConfig.brandName}} 中密码强度等级分为以下几种：

- 任意非空字符串；
- 至少 6 位字符；
- 至少 6 位字符，且须包含英文、数字与符号中的两种；
- 至少 6 位字符，且密码中须包含英文、数字与符号。

默认为任意非空字符，你可以[在此](/guides/security/pw-security.md) 配置用户池的密码强度等级。

#### 参数

- `password` \<string\> 明文密码。

#### 示例

```javascript
authenticationClient.checkPasswordStrength('weak')
```

```javascript
authenticationClient.checkPasswordStrength('strongPassw0rd!')
```

#### 示例数据

- 满足密码强度要求

```json
{
  "valid": true,
  "message": "密码检验成功"
}
```

- 不满足密码强度要求

```json
{
  "valid": false,
  "message": "请使用至少 6 位字符作为密码，须包含英文、数字与符号中的两种"
}
```

## 获取自定义数据
```js
AuthenticationClient().getUdfValue()
```

获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // 使用用户的 token 初始化 SDK
})

const data = await authenticationClient.getUdfValue()
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 设置自定义数据
```js
AuthenticationClient().setUdfValue(data)
```

> 设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `data` \<string\> 输入数据，类型为一个对象，详情请见示例。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // 使用用户的 token 初始化 SDK
})

await authenticationClient.setUdfValue({
  school: '华中科技大学',
  age: 20,
})
```

## 删除自定义数据
```js
AuthenticationClient().removeUdfValue(key)
```

删除用户的某一个自定义数据。

#### 参数

- `key` \<string\> 自定义字段的 key 。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // 使用用户的 token 初始化 SDK
})

await authenticationClient.removeUdfValue('school')
```

## 检测 Token 登录状态
```js
AuthenticationClient().checkLoginStatus(token)
```

检测用户 [id_token](/concepts/id-token.md) 的登录状态。

#### 参数

- `token` \<string\> 用户的登录凭证 token

#### 示例

```javascript
const data = await authenticationClient.checkLoginStatus('TOKEN')
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

## 上传头像
```js
AuthenticationClient().uploadAvatar(options)
```

该方法会自动打开浏览器文件上传框（支持上传的文件格式为 `image/*`），并自动完成图片文件上传 CDN、修改用户头像操作。

如果你需要使用自己的图片存储服务，或者图片已经上传好了，请使用 `updateProfile` 方法，如：

```javascript
authenticationClient.updateProfile({
  photo: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=bob'
})
```

#### 参数

- options.accept: 支持的图片格式，默认为 `image/*`

#### 代码示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // 使用用户的 token 初始化 SDK
})

const user = await authing.uploadAvatar()

// 仅选择 png 格式的图片
const user = await authing.uploadAvatar({
  accept: '.png'
})
```

#### 演示示例

![](https://cdn.authing.cn/img/%E4%B8%8A%E4%BC%A0%E5%A4%B4%E5%83%8F.gif)

#### 返回值

该方法会返回用户最新的个人信息。

## 通过短信验证码重置密码
```js
AuthenticationClient().resetPasswordByPhoneCode(phone, code, newPassword)
```

通过短信验证码重置密码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码
- `phoneCountryCode` \<string\> 国际区号 列: '+44'

#### 示例

```javascript
authenticationClient.resetPasswordByPhoneCode('176xxxx6754', '1234', 'passw0rd')

// 国外号码
authenticationClient.resetPasswordByPhoneCode('788xxxx637', '1234', 'passw0rd', '+44')
```

#### 返回值

- `Promise<CommonMessage>`

## 通过邮件验证码重置密码
```js
AuthenticationClient().resetPasswordByEmailCode(email, code, newPassword)
```

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

#### 参数

- `email` \<string\> 邮箱
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```javascript
import { EmailScene } from 'authing-js-sdk'

// 1. 发送邮件验证码
authenticationClient.sendEmail('test@example.com', EmailScene.ResetPassword)

// 2. 通过邮件验证码发送验证邮件
authenticationClient.resetPasswordByEmailCode(
  'test@example.com',
  '1234',
  'passw0rd'
)
```

#### 返回值

- `Promise<CommonMessage>`

## 修改用户资料
```js
AuthenticationClient().updateProfile(updates)
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
- `updates.gender` \<string\> 性别, M 表示男性、F 表示女性、未知表示 U
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

- 修改昵称和最近登录地址

```javascript
authenticationClient.updateProfile({
  nickname: 'Nick',
  lastIp: '111.111.111.111',
})
```

- 不能直接修改手机号、邮箱、密码，会报错

```js
try {
  await authenticationClient.updateProfile({
    phone: '176xxxx6754'
  })
} catch (error) {
  // this will fail, you can't change your phone directly, must verify by phone code
}
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 更新用户密码
```js
AuthenticationClient().updatePassword(newPassword, oldPassword)
```

更新用户密码，需要提供原始密码。

#### 参数

- `newPassword` \<string\> 新密码
- `oldPassword` \<string\> 旧密码，如果用户没有设置密码，可以不填。

#### 示例

- 由手机号、社会化登录等其他方式注册的，首次没有设置密码，oldPassword 留空

```javascript
authenticationClient.updatePassword('passw0rd')
```

- 用户之前设置了密码

```javascript
authenticationClient.updatePassword('passw0rd', 'oldPassw0rd')
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 绑定手机号
```js
AuthenticationClient().bindPhone(phone, phoneCode)
```

用户初次绑定手机号，如果需要修改手机号请使用 [updatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [sendSmsCode](#发送短信验证码) 方法。

终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<string\> 手机号；
- `phoneCode` \<string\> 手机号验证码；
- `phoneCountryCode` \<string\> 国际区号，例：+1 。 注意区号格式；

#### 示例

```javascript
authenticationClient.getCurrentUser().then(user => {
  if (!user.phone) {
    // 1. 第一步：发送短信验证码
    authenticationClient.sendSmsCode('176xxxx6754').then(() => {
      // 2. 第二步：使用手机号验证码绑定手机号
      authenticationClient.bindPhone('176xxxx6754', '1234')
    })

    /* 国外手机号
    * authenticationClient.sendSmsCode('788xxxx637', '+44').then(() => {
    *   authenticationClient.bindPhone('788xxxx637', '1234', '+44')
    * })
    */
  }
})
```

#### 返回值

该接口会返回最新的用户信息。


- [Promise\<User\>](/guides/user/user-profile.md)

## 解绑手机号
```js
AuthenticationClient().unbindPhone()
```

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```javascript
authenticationClient.getCurrentUser().then(user => {
  if (user.phone) {
    authenticationClient.unbindPhone()
  }
})
```

#### 返回值

该接口会返回最新的用户信息。


- [Promise\<User\>](/guides/user/user-profile.md)

## 更新用户手机号
```js
AuthenticationClient().updatePhone(phone, phoneCode, oldPhone, oldPhoneCode, phoneCountryCode, oldPhoneCountryCode)
```

更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。

也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。

开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。

![](https://cdn.authing.cn/img/20210414110024.png)

用户首次绑定手机号请使用 [bindPhone](#绑定手机号) 接口。

#### 参数

- `phone` \<string\> 新手机号
- `phoneCode` \<string\> 新手机号的验证码
- `oldPhone` \<string\> 旧手机号
- `oldPhoneCode` \<string\> 旧手机号的验证码
- `phoneCountryCode` \<string\> 新手机号区号
- `oldPhoneCountryCode` \<string\> 旧手机号区号


#### 示例

- 关闭了“验证原有手机号”选项

```javascript
authenticationClient.updatePhone('176xxxx6754', '1234') // 关闭了“验证原有手机号“选项

// 国际号码
authenticationClient.updatePhone('788xxxx637', '1234', '+44')

```
- 开启了“验证原有手机号”选项
```javascript
authenticationClient.updatePhone('176xxxx6754', '1234', '156xxxx9876', '1234') // 开启了“验证原有手机号“选项

// 国际号码
authenticationClient.updatePhone('156xxxx9876', '1234', '788xxxx637', '1234', '+86', '+44')
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 绑定邮箱
```js
AuthenticationClient().bindEmail(email, emailCode)
```

用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [updateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [sendEmail](#发送邮件) 方法。

终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<string\> 邮箱
- `emailCode` \<string\> 邮件验证码，可通过 [sendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL。

#### 示例

```javascript
authenticationClient.bindEmail('test@example.com', '1234')
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 解绑邮箱
```js
AuthenticationClient().unbindEmail(email, emailCode)
```

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```javascript
authenticationClient.getCurrentUser().then(user => {
  if (user.email)
    authenticationClient.unbindEmail()  
  }
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 更新用户邮箱
```js
AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)
```

如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。

开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。

![](https://cdn.authing.cn/img/20210414105928.png)

用户首次绑定邮箱请使用 [bindEmail](#绑定邮箱) 接口。

#### 参数

- `email` \<string\> 新邮箱
- `emailCode` \<string\> 新邮箱的验证码
- `oldEmail` \<string\> 旧邮箱
- `oldEmailCode` \<string\> 旧邮箱的验证码

#### 示例

- 关闭了“验证原有邮箱”选项

```javascript
authenticationClient.updateEmail('test@example.com', '1234') // 关闭了“验证原有邮箱“选项
```
- 开启了“验证原有邮箱”选项

```javascript
authenticationClient.updateEmail(
  'test@example.com',
  '1234',
  'test2@example.com',
  '1234'
) // 开启了“验证原有邮箱“选项
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 合并账号身份信息
```js
AuthenticationClient().linkAccount(options)
```

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `options.primaryUserToken` \<string\> 主账号 Token
- `options.secondaryUserToken` \<string\> 子账号 Token

#### 示例

```javascript
authenticationClient.linkAccount({
  primaryUserToken: primaryUser.token,
  secondaryUserToken: secondaryUser.token,
})
```

#### 返回值

```json
{
  "code": 200,
  "message": "绑定成功"
}
```

<!-- ## 解绑社交账号
```js
AuthenticationClient().unLinkAccount(options)
```

主账号解绑社会化登录账号。

#### 参数

- `options.primaryUserToken` \<string\> 主账号用户的 `id_token`；
- `options.provider` \<string\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)。


#### 示例

```javascript
authenticationClient.unLinkAccount({
  primaryUserToken: primaryUser.token,
  provider: 'github'
})
```

#### 返回值

```json
{
  "code": 200,
  "message": "绑定成功"
}
``` -->


## 计算密码安全等级
```js
AuthenticationClient().computedPasswordSecurityLevel()
```

计算密码安全等级。

#### 参数

- `password`: 需要计算的密码（明文格式），必须为 `string` 类型；

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const securityLevel = authenticationClient.computedPasswordSecurityLevel(
  'xxxxxxxx'
)
```

#### 返回值

返回值有三种情况：

- `1`: 等级低
- `2`: 等级中
- `3`: 等级高

## 获取用户账号安全等级
```js
AuthenticationClient().getSecurityLevel()
```

获取此账号的账号安全等级。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // 使用用户的 token 初始化 SDK
})

const securityLevel = await authenticationClient.getSecurityLevel()
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

- `email`: \<boolean\>，是否绑定了邮箱
- `mfa`: \<boolean\>，是否绑定了个人 MFA
- `password`: \<boolean\>，是否设置了密码
- `phone`: \<boolean\>，是否绑定了手机号
- `passwordSecurityLevel`: \<number | null\>，密码安全登录，`null` 表示还没检测过密码安全等级
  - `1`: 低,
  - `2`: 中,
  - `3`: 高,
- `score`: \<number\>，账户安全等级总体评分，最高 100 分

## 获取用户被授权的所有资源列表

```js
AuthenticationClient().listAuthorizedResources(namespace,options)
```

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `options.resource_type` \<string\> 资源类型，一共有以下几种资源类型
    - `DATA`: 数据类型
    - `API`: API 类型数据
    - `MENU`: 菜单类型数据

#### 示例

```javascript
authenticationClient.users.listAuthorizedResources('namespace_code')
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
```js
AuthenticationClient().listApplications(params)
```

获取当前用户能够访问的应用。

#### 参数

-   `page` \<number\> 分页序号, 默认为 `1`。
-   `limit` \<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN'
})

const { totalCount, list } = authenticationClient.listApplications({
    page: 1,
    limit: 10,
});
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

## 刷新当前用户的 Token

```js
AuthenticationClient().refreshToken()
```

刷新当前用户的 Token

#### 示例

```js
await authing.registerByUsername(username, password, null, {
    forceLogin: true
});
const data = await authing.refreshToken();
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

```javascript
AuthenticationClient().setUdv(key,value)
```

添加自定义数据

#### 参数
- `key` \<string\> 自定义数据 Key
- `value` \<string\> 自定义数据 Key
#### 示例

```javascript
  const key = generateRandomString(10);
  await managementClient.udf.set(
    UdfTargetType.User,
    key,
    UdfDataType.String,
    generateRandomString(5)
  );

  await authing.setUdv(key, '123');
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

```js
AuthenticationClient().removeUdv(key) 
```

删除自定义数据

#### 参数
- `key` \<string\> 自定义数据 Key
#### 示例

```js
  const key = generateRandomString(10);
  await managementClient.udf.set(
    UdfTargetType.User,
    key,
    UdfDataType.String,
    generateRandomString(5)
  );

  await authing.setUdv(key, '123');
  await authing.removeUdv(key);
```

#### 示例数据
```json
[]
```


## 获取用户所在组织机构

```js
AuthenticationClient().listOrgs()
```

获取用户所在组织机构

#### 示例

```js
  const authing = new AuthenticationClient({
    ...getOptionsFromEnv(),
  });
  await authing.loginByUsername("xxxx","xxx");
  const data = await authing.listOrgs();
```

#### 示例数据
```json
[]
```

 

## 判断当前用户是否有某个角色

```js
AuthenticationClient().hasRole(code,namespace)
```

判断当前用户是否有某个角色
#### 参数
- `code` \<string\> 角色 Code
- `namespace` \<string\> 命名空间
#### 示例

```js
await authing.loginByUsername("xx",password)
const res = await authing.hasRole("code")
```

#### 示例数据
```js
boolean
```
## 通过首次登录的 Token 重置密码

```js
AuthenticationClient().resetPasswordByFirstLoginToken(params)
```

通过首次登录的 Token 重置密码，需要在创建用户时设置“强制用户首次登录时修改密码”
#### 参数
- `params` \<object\>  
- `params.token` \<string\> 首次登录的 Token
- `params.password` \<string\> 密码

#### 示例

```js
const result = await authing.resetPasswordByFirstLoginToken({token:'eyJhbG14CTs',password})
```


## 通过密码强制更新临时 Token 修改密码

```js
AuthenticationClient().resetPasswordByForceResetToken(params)
```

通过密码强制更新临时 Token 修改密码
#### 参数
- `params` \<object\>  
- `params.token` \<string\> 首次登录的 Token
- `params.oldPassword` \<string\> 旧密码
- `params.newPassword` \<string\> 新密码
#### 示例

```js
authentication.resetPasswordByForceResetToken({token:'',oldPassword:'',newPassword:''})
```


## 获取当前用户所有部门

AuthenticationClient().listDepartments()

获取当前用户能够访问的应用。

#### 参数

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN'
})

const { departments } = authenticationClient.listDepartments();
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

```js
AuthenticationClient().isUserExists(options)
```

判断用户是否存在
#### 参数
- `options` \<object\> 
- `options.user_name` \<string\> 用户名
- `options.email`  \<string\> 邮箱
- `options.phone`  \<string\> 电话
- `options.externalId`  \<string\> 数据源ID
#### 示例

```js
const res = await authing.isUserExists({username:"xx"})
```
#### 示例数据
```js
boolean
```
