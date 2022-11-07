# 认证核心模块

<LastUpdated/>

此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
```

## 使用邮箱注册

authenticationClient.registerByEmail(param)

> 使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `param` \<RegisterByEmailInput\>
- `param.email` \<String\> 邮箱
- `param.password` \<String\> 密码
- `param.profile` \<RegisterProfileInput\> 用户资料
- `param.forceLogin` \<Boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1。默认为 false。
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String email = "test@example.com";
String password = "123456";

User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
```

## 使用用户名注册

authenticationClient.registerByUsername(param)

> 使用用户名注册，用户名区分大小写且用户池内唯一。

#### 参数

- `param` \<RegisterByUsernameInput\>
- `param.username` \<String\> 用户名
- `param.password` \<String\> 密码
- `param.profile` \<RegisterProfileInput\> 用户资料
- `param.forceLogin` \<Boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook，同时该用户的累计登录次数会加 1。默认为 false。
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String username = "test";
String password = "123456";
User user = authenticationClient.registerByUsername(new RegisterByUsernameInput(username, password)).execute();
```

## 使用手机号注册

authenticationClient.registerByPhoneCode(param)

> 使用手机号注册，你可以同时设置该账号的初始密码。发送短信的接口请见 [sendSmsCode](#发送短信验证码)

#### 参数

- `param` \<RegisterByPhoneCodeInput\>
- `param.code` \<String\> 短信验证码
- `param.phone` \<String\> 手机号
- `param.password` \<String\> 初始密码
- `param.profile` \<RegisterProfileInput\> 用户资料
- `param.forceLogin` \<Boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook，同时该用户的累计登录次数会加 1。默认为 false。
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String phone = "phone number";
String code = "1234";
String password = "123456";

RegisterByPhoneCodeInput param = new RegisterByPhoneCodeInput(phone, code).withPassword(password);
User user = authenticationClient.registerByPhoneCode(param).execute();
```

## 使用邮箱登录

authenticationClient.loginByEmail(param)

> 使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
> ![](https://cdn.authing.cn/img/20210414145613.png)
> 如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。

#### 参数

- `param` \<LoginByEmailInput\>
- `param.email` \<String\> 邮箱
- `param.password` \<String\> 密码
- `param.autoRegister` \<Boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `param.captchaCode` \<String\> 图形验证码
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.autoRegister` \<Boolean\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `param.captchaCode` \<String\> 图形验证码
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();
```

## 使用用户名登录

authenticationClient.loginByUsername(param)

> 使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `param` \<LoginByUsernameInput\>
- `param.username` \<String\> 用户名
- `param.password` \<String\> 密码
- `param.autoRegister` \<Boolean\> 是否自动注册，如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `param.captchaCode` \<String\> 图形验证码
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String username = "username";
String password = "123456";
User user = authenticationClient.loginByUsername(new LoginByUsernameInput(username, password)).execute();
```

## 使用手机号验证码登录

authenticationClient.loginByPhoneCode(param)

> 使用手机号验证码登录。你需要先使用 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `param` \<LoginByPhoneCodeInput\>
- `param.phone` \<String\> 手机号
- `param.code` \<String\> 短信验证码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

## 使用手机号密码登录

authenticationClient.loginByPhonePassword(param)

> 如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `param` \<LoginByPhonePasswordInput\>
- `param.phone` \<String\> 手机号
- `param.password` \<String\> 密码
- `param.captchaCode` \<String\> 图形验证码
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `param.context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```java
String phone = "phone number";
String password = "123456";
User user = authenticationClient.loginByPhonePassword(new LoginByPhonePasswordInput(phone, password)).execute();
```

## 子账号登录

authenticationClient.loginBySubAccount(param)

> 如果用户开启了子账号登录，可以使用子账号登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `param` \<LoginBySubAccountParam\>
- `param.account` \<String\> 子账号
- `param.password` \<String\> 密码
- `param.captchaCode` \<String\> 图形验证码
- `param.clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。

#### 示例

```java
String account = "account number";
String password = "123456";
User user = authenticationClient.loginByPhonePassword(new LoginByPhonePasswordInput(account, password)).execute();
```

## 使用 LDAP 用户名登录

authenticationClient.loginByLdap(param)

> 使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。 点此查看[连接 LDAP 身份源](/connections/ldap/)文档。

#### 参数

- `param` \<LoginByLdapParam\>
- `param.username` \<String\> 用户名
- `param.password` \<String\> 密码

#### 示例

```java
String username = "test";
String password = "test";
LoginByLdapParam loginByLdapParam = new LoginByLdapParam(username, password);
User user = authenticationClient.loginByLdap(loginByLdapParam).execute();
```

## 使用 AD 用户名登录

authenticationClient.loginByAd(username, password)

> 使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。
> 点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档。

#### 参数

- `username` \<String\> 用户名
- `password` \<String\> 密码

#### 示例

```java
String username = "test";
String password = "test";
User user = authenticationClient.loginByAd(username, password).execute();
```

## 获取当前登录的用户信息

authenticationClient.getCurrentUser()

> 获取当前登录用户的用户信息，需要 AuthenticationClient 当前处于已登录状态才能获取到。你可以通过两种方式设置 AuthenticationClient 的登录状态：
>
> 1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，AuthenticationClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态。
> 2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 AuthenticationClient。

#### 示例

```java
User user = authenticationClient.getCurrentUser().execute();
```

## 判断是否登录

authenticationClient.checkLoggedIn()

> 判断是否登录
>
> 1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，AuthenticationClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态。
> 2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 AuthenticationClient。
> 3. 依据是否已经缓存用户的登录状态来判断是否登录。

#### 示例

```java
Boolean b = authenticationClient.checkLoggedIn();
```

## 退出登录

authenticationClient.logout()

> 用于用户退出登录
>
> 1. 清空该用户在当前应用下的 session 会话信息。
> 2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据。

#### 示例

```java
authenticationClient.logout().execute();
```

## 获取当前用户的自定义数据列表

authenticationClient.listUdv()

> 获取当前用户的自定义数据列表 需要用户先登录

#### 示例

```java
authenticationClient.listUdv().execute();
```

## 添加用户自定义数据

authenticationClient.setUdv(key, value)

> 添加用户自定义数据 需要用户先登录

#### 参数

- `key` \<String\> 自定义数据的 Key
- `value` \<String\> 自定义数据的 Value

#### 示例

```java
authenticationClient.setUdv("key", "value").execute();
```

## 获取用户所在组织机构数据列表

authenticationClient.listOrgs()

> 获取用户所在组织机构数据列表 需要用户先登录

#### 示例

```java
authenticationClient.listOrgs().execute();
```

## 发送短信验证码

authenticationClient.sendSmsCode(phone)

> 发送短信验证码, 目前仅支持国内手机号；该接口有接口频率限制，请勿频繁请求。

#### 参数

- `phone` \<String\> 手机号码

#### 示例

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

## 发送邮件

authenticationClient.sendEmail(email, scene)

> 主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)。

#### 参数

- `email` \<String\> 邮箱
- `scene` \<EmailScene\> 发送场景，可选值为 RESET_PASSWORD（发送重置密码邮件，邮件中包含验证码）、VERIFY_EMAIL（发送验证邮箱的邮件）、CHANGE_EMAIL（发送修改邮箱邮件，邮件中包含验证码）

  - `RESET_PASSWORD`：发送重置密码邮件，邮件中包含验证码；
  - `VERIFY_EMAIL`：发送验证邮箱的邮件；
  - `CHANGE_EMAIL`：发送修改邮箱邮件，邮件中包含验证码；
  - `MFA_VERIFY`：发送 MFA 验证邮件。

#### 示例

```java
authenticationClient.sendEmail("test@example.com", EmailScene.RESET_PASSWORD).execute();
```

## 获取自定义数据

authenticationClient.getUdfValue()

> 获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 示例

```java

Map resu = authenticationClient.getUdfValue().execute();
```

## 设置自定义数据

authenticationClient.setUdfValue(data)

> 设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `data` \<Map\<String, String\>\> 输入数据，类型为一个对象，详情请见示例。

#### 示例

```java
Map<String, String> p = new HashMap();
p.put("dnum", "234");
List<UserDefinedData> result = this.authenticationClient.setUdfValue(p).execute();
```

## 删除自定义数据

authenticationClient.removeUdfValue(key)

> 删除自定义数据。

#### 参数

- `key` \<String\> 自定义字段的 Key

#### 示例

```java
List<UserDefinedData> result = this.authenticationClient.removeUdfValue("URF_KEY").execute();
```

## 检测 Token 登录状态

authenticationClient.checkLoginStatus()

> 检测 Token 登录状态

#### 示例

```java
JwtTokenStatus status = authenticationClient.checkLoginStatus().execute();
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

authenticationClient.resetPasswordByPhoneCode(phone, code, newPassword)

> 通过短信验证码重置密码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<String\> 手机号
- `code` \<String\> 验证码
- `newPassword` \<String\> 新的密码

#### 示例

```java
String phone = "phone number";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByPhoneCode(phone, code, password).execute();
```

## 通过邮件验证码重置密码

authenticationClient.resetPasswordByEmailCode(email, code, newPassword)

> 通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

#### 参数

- `email` \<String\> 邮箱
- `code` \<String\> 验证码
- `newPassword` \<String\> 新的密码

#### 示例

```java
String email = "test@example.com";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByEmailCode(email, code, password).execute();
```

## 修改用户资料

authenticationClient.updateProfile(updates)

> 修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 [updatePhone](#更新用户手机号)、[updateEmail](#更新用户邮箱)、[updatePassword](#更新用户密码) 接口。

#### 参数

- `updates` \<UpdateUserInput\> 修改的用户资料
- `updates.username` \<String\> 用户名
- `updates.nickname` \<String\> 昵称
- `updates.photo` \<String\> 头像
- `updates.company` \<String\> 公司
- `updates.browser` \<String\> 浏览器
- `updates.device` \<String\> 设备
- `updates.lastIP` \<String\> 最近登录的 IP
- `updates.name` \<String\> Name
- `updates.givenName` \<String\> Given Name
- `updates.familyName` \<String\> Family Name
- `updates.formatted` \<String\> 详细地址
- `updates.middleName` \<String\> Middle Name
- `updates.profile` \<String\> Profile Url
- `updates.preferredUsername` \<String\> Preferred Name
- `updates.website` \<String\> 个人网站
- `updates.gender` \<String\> 性别，M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）。
- `updates.birthdate` \<String\> 生日
- `updates.zoneinfo` \<String\> 时区
- `updates.locale` \<String\> 语言
- `updates.address` \<String\> 地址
- `updates.streetAddress` \<String\> 街道地址
- `updates.locality` \<String\>
- `updates.region` \<String\> 地域
- `updates.postalCode` \<String\> 邮编
- `updates.city` \<String\> 城市
- `updates.province` \<String\> 省份
- `updates.country` \<String\> 国家

#### 示例

```java
User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
```

## 更新用户密码

authenticationClient.updatePassword(newPassword, oldPassword)

> 更新用户密码

#### 参数

- `newPassword` \<String\> 新密码
- `oldPassword` \<String\> 旧密码，如果用户没有设置密码，可以不填。

#### 示例

```java
String oldPassword = "111111";
String newPassword = "123456";
User user = authenticationClient.updatePassword(newPassword, oldPassword).execute();
```

## 绑定手机号

authenticationClient.bindPhone(phone, phoneCode)

> 用户初次绑定手机号，如果需要修改手机号请使用 [updatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [sendSmsCode](#发送短信验证码) 方法。
> 终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：
> ![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<String\> 手机号
- `phoneCode` \<String\> 手机验证码

#### 示例

```java
User user = authenticationClient.bindPhone("phone number", "1234").execute();
```

## 解绑手机号

authenticationClient.unbindPhone()

> 用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。
> 终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)：
> ![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```java
User user = authenticationClient.unbindPhone().execute();
```

## 更新用户手机号

authenticationClient.updatePhone(phone, phoneCode, oldPhone, oldPhoneCode)

> 更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。 开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。
> ![](https://cdn.authing.cn/img/20210414110024.png)

用户首次绑定手机号请使用 [bindPhone](#绑定手机号) 接口。

#### 参数

- `phone` \<String\> 新手机号
- `phoneCode` \<String\> 新手机号的验证码
- `oldPhone` \<String\> 旧手机号
- `oldPhoneCode` \<String\> 旧手机号的验证码

#### 示例

```java
User user = authenticationClient.updatePhone("phone number", "1234").execute();
```

## 绑定邮箱

authenticationClient.bindEmail(email, emailCode)

> 用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [updateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [sendEmail](#发送邮件) 方法。
> 终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：
> ![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<String\> 邮箱
- `emailCode` \<String\> 邮件验证码，可通过 [sendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL。

#### 示例

```java
User user = authenticationClient.bindEmail("demo@authing.cn", "1234").execute();
```

## 解绑邮箱

authenticationClient.unbindEmail()

> 用户解绑手机号，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。
> 终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：
> ![](https://cdn.authing.cn/blog/20201019200112.png)

#### 示例

```java
User user = authenticationClient.unbindEmail().execute();
```

## 更新用户邮箱

authenticationClient.updateEmail(email, emailCode, oldEmail, oldEmailCode)

> AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。
> ![](https://cdn.authing.cn/img/20210414105928.png)
> 用户首次绑定邮箱请使用 [bindEmail](#绑定邮箱) 接口。

#### 参数

- `email` \<String\> 新邮箱
- `emailCode` \<String\> 新邮箱的验证码
- `oldEmail` \<String\> 旧邮箱
- `oldEmailCode` \<String\> 旧邮箱的验证码

#### 示例

```java
String newEmail = "new@example.com";
String emailCode = "1234"
User user = authenticationClient.updateEmail(newEmail, emailCode).execute();
```

<!--## 刷新当前用户的 token

authenticationClient.refreshToken()

> 刷新当前用户的 token，调用此接口要求先登录。

#### 示例

```java
RefreshToken token = authenticationClient.refreshToken().execute();
```-->

## 合并账号身份信息

authenticationClient.linkAccount(primaryUserToken, secondaryUserToken)

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `primaryUserToken` \<String\> 主账号 Token
- `secondaryUserToken` \<String\> 子账号 Token

#### 示例

```java
String primaryUserToken = "test";
String secondaryUserToken = "test";
authenticationClient.linkAccount(primaryUserToken, secondaryUserToken).execute();
```

<!-- ## 解绑社交账号

authenticationClient.unLinkAccount(options)

> 主账号解绑社会化登录账号。

#### 参数

- `options.primaryUserToken` \<String\> 主账号用户的 `id_token`
- `options.provider` \<ProviderType\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)。
#### 示例

```java
authenticationClient.unLinkAccount(new UnLinkAccountParam("primaryUserToken", ProviderType.QQ)).execute();
```

#### 返回值

```json
{
  "code": 200,
  "data": true,
  "message": "绑定成功"
}
``` -->

## 检查密码强度

authenticationClient.checkPasswordStrength(password)

> 检查密码强度，详情请见 [密码策略](/guides/security/pw-security/pw-policy.md)。
> 判断密码是否符合密码强度要求。{{$localeConfig.brandName}} 中密码强度等级分为以下几种：
>
> - 任意非空字符串；
> - 至少 6 位字符；
> - 至少 6 位字符，且须包含英文、数字与符号中的两种；
> - 至少 6 位字符，且密码中须包含英文、数字与符号。

#### 参数

- `password` \<String\> 密码

#### 示例

```java
String password = "test";
CheckPasswordStrengthResult result = authenticationClient.checkPasswordStrength(password).execute();
```

## 计算密码安全等级

authenticationClient.computedPasswordSecurityLevel(password)

> 计算密码安全等级。

#### 参数

- `password` 需要计算的密码（明文格式），必须为 `String` 类型。

#### 示例

```java

PasswordSecurityLevel securityLevel = authenticationClient.computedPasswordSecurityLevel("password")
```

## 获取用户账号安全等级

authenticationClient.getSecurityLevel()

> 获取用户账号安全等级。

#### 示例

```java
SecurityLevel result = authenticationClient.getSecurityLevel().execute();
Assert.assertNotNull(result !=null);
```

<!--## Code 换 Token

authenticationClient.getAccessTokenByCode(code)

> 使用授权码 Code 获取用户的 Token 信息。

#### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code)。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### 示例

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");

Object result = authenticationClient.getAccessTokenByCode("CODE").execute();
Assert.assertNotNull(result !=null);
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

## Token 换用户信息

authenticationClient.getUserInfoByAccessToken('access_token')

> 使用 Access token 获取用户信息。

#### 参数

- `access_token` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code)。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### 示例

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

authenticationClient.setSecret("AUTHING_APP_SECRET");
// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");


Object result = testAC.getUserInfoByAccessToken("ACCESS_TOKEN").execute();
Assert.assertNotNull(result !=null);
```

#### 示例数据

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc",
  "phone_number": null,
  "phone_number_verified": false
}
```

## Client Credentials 模式获取 Access Token

authenticationClient.getAccessTokenByClientCredentials(scope, options)

> 使用编程访问账号获取具备权限的 Access Token。

#### 参数

- `scope` \<String\> 权限项目，空格分隔的字符串，每一项代表一个权限。详情请见[机器间（M2M）授权](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options`，编程访问账号的 AK 与 SK 信息。
- `options.accessKey`，编程访问账号 AccessKey。
- `options.secretKey`，编程访问账号 SecretKey。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### 示例

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

authenticationClient.setSecret("AUTHING_APP_SECRET");
// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");

ClientCredentialInput clientCredentialInput = new ClientCredentialInput("AUTHING_APP_ID", "AUTHING_APP_SECRET");
Object result = testAC.getAccessTokenByClientCredentials("testr2",clientCredentialInput).execute();
Assert.assertNotNull(result !=null);
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```
-->

## 获取当前用户能够访问的应用

authenticationClient.listApplications(page, limit)

> 获取当前用户能够访问的应用。

#### 参数

- `page` \<Integer\> 分页序号，默认为 `1`。
- `limit` \<Integer\> 每页返回的个数，默认为 `10`。

#### 示例

```java
Pagination<ApplicationPublicDetail> resData = authenticationClient.listApplications(1, 10).execute();
```

## 获取用户被授权的所有资源列表

authenticationClient.listAuthorizedResources(namespace)

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `namespace` \<String\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```java
PaginatedAuthorizedResources res = authenticationClient.listAuthorizedResources(namespace).execute();
```

## 生成一个 PKCE 校验码

authenticationClient.generateCodeChallenge()

> 生成一个 PKCE 校验码，长度必须大于等于 43

#### 示例

```java
String res = authenticationClient.generateCodeChallenge();
```

## 生成一个 PKCE 校验码摘要值

authenticationClient.getCodeChallengeDigest(param)

> 生成一个 PKCE 校验码摘要值

#### 参数

- `param` \<CodeChallengeDigestParam\> PKCE 校验码、摘要算法参数
- `param.codeChallenge` \<String\> 待生成摘要值的 code_challenge 原始值，一个长度大于等于 43 的随机字符串。
- `param.method` \<String\> 可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法原样返回，S256 表示使用 SHA256 计算 code_challenge 摘要。

#### 示例

```java
String res = authenticationClient.getCodeChallengeDigest(new CodeChallengeDigestParam("codeChallenge","S256"));
```

## 判断当前用户是否有某个角色

authenticationClient.hasRole(roleCode, namespace)

> 判断当前用户是否有某个角色

#### 参数

- `roleCode` \<String\> 角色编码 Code
- `namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```java
Boolean res = authenticationClient.hasRole("roleCode", "default").execute();
```

## 判断用户是否存在

authenticationClient.isUserExists(username, email, phone, externalId)

> 判断用户是否存在

#### 参数

- `username` \<String\> 用户名
- `email` \<String\> 用户邮箱
- `phone` \<String\> 用户手机号
- `externalId` \<String\> 用户外部 Id

#### 示例

```java
Boolean res = authenticationClient.isUserExists("username", "email", "phone", "externalId").execute();
```

## 获取用户所有部门

authenticationClient.listDepartments()

> 获取用户所有部门

#### 示例

```java
PaginatedDepartments res = authenticationClient.listDepartments().execute();
```

## 通过首次登录的 Token 重置密码

authenticationClient.resetPasswordByFirstLoginToken(token, password)

> 通过首次登录的 Token 重置密码

#### 参数

- `token` \<String\> 首次登录的 Token
- `password` \<String\> 重置后的密码

#### 示例

```java
CommonMessage res = authenticationClient.resetPasswordByFirstLoginToken("token", "password").execute();
```

## 通过密码强制跟临时 Token 修改密码

authenticationClient.resetPasswordByForceResetToken(token, oldPassword, newPassword)

> 通过密码强制跟临时 Token 修改密码

#### 参数

- `token` \<String\> 临时登录的 Token
- `oldPassword` \<String\> 修改前的密码
- `newPassword` \<String\> 重置后的密码

#### 示例

```java
CommonMessage res = authenticationClient.resetPasswordByForceResetToken("token", "oldPassword", "newPassword").execute();
```

## 检测密码是否合法

authenticationClient.isPasswordValid(password)

> 检测密码是否合法

#### 参数

- `password` \<String\> 被检查的密码

#### 示例

```java
CommonMessage res = authenticationClient.isPasswordValid("password").execute();
```

## SSO 检测登录态

authenticationClient.trackSession()

> SSO 检测登录态

#### 示例

```java
User res = authenticationClient.trackSession().execute();
```

## 检验 CAS 1.0 Ticket 合法性

authenticationClient.validateTicketV1(ticket, service)

> 检验 CAS 1.0 Ticket 合法性

#### 参数

- `ticket` \<String\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<String\> CAS 回调地址

#### 示例

```java
ValidateTicketV1Response res = authenticationClient.validateTicketV1("ticket", "service").execute();
```

## 通过远端服务验证票据合法性

authenticationClient.validateTicketV2(ticket, service)

> 通过远端服务验证票据合法性

#### 参数

- `ticket` \<String\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<String\> CAS 回调地址
- `format` \<String\> 返回报文格式化方式，支持 XML | JSON。

#### 示例

```java
Sting res = authenticationClient.validateTicketV2("ticket", "service", "JSON").execute();
```
