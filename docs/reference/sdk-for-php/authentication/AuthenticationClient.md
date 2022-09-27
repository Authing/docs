# 认证核心模块

<LastUpdated/>

此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。如果你倾向于以管理员的身份管理用户，请使用 [UsersManagementClient - 用户管理模块](../management/UsersManagementClient.md)。

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
    $opts->appHost = "YOUR_APPHOST";
});

$authentication->registerByEmail // 使用邮箱注册
$authentication->loginByEmail // 使用邮箱登录
```

## 使用邮箱注册

AuthenticationClient->registerByEmail(string $email, string $password, RegisterProfile $profile = null, array $options = null)

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<Object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<Object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

- 使用邮箱和密码注册

```php
$email = "test@example.com";
$password = "123456";
$user = $authentication->registerByEmail($email, $password);
```

- 注册的同时设置用户信息（昵称和公司）

```php
use Authing\Types\RegisterProfile;

$profile = new RegisterProfile();
$profile->nickname = 'Nick';
$profile->company = '字节跳动';
$authentication->registerByEmail(
  'test@example.com',
  'passw0rd',
  $profile,
);
```

- 注册的同时设置 `客户端真实 IP`

```php
$authentication->registerByEmail(
  'test@example.com',
  'passw0rd',
  null,
  [
    'clientIp' => 'your ip'
  ]
);
```

## 使用用户名注册

AuthenticationClient->registerByUsername(string $username, string $password, RegisterProfile $profile = null, array $options = [])

使用用户名注册

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<Object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<Object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
#### 示例

- 使用用户名密码注册

```php
$username = "username";
$password = "123456";
$user = $authenticationClient->registerByUsername($username, $password);
```

- 注册的同时设置用户信息（昵称和公司）

```php
use Authing\Types\RegisterProfile;

$profile = new RegisterProfile();
$profile->nickname = 'Nick';
$profile->company = '字节跳动';
$authenticationClient->registerByUsername(
  'bob',
  'passw0rd',
  $profile,
);
```

- 注册的同时设置 `客户端真实 IP`

```php
$authenticationClient->registerByUsername(
  'bob',
  'passw0rd',
  null,
  [
    'clientIp' => 'your ip'
  ]
);
```

## 使用手机号注册

AuthenticationClient->registerByPhoneCode(string $phone, string $code, string $password = '', RegisterProfile $profile = null, array $options = [])

使用手机号注册，你可以同时设置该账号的初始密码。你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 短信验证码
- `password` \<string\> 初始密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<Object\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<Object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
#### 示例

- 使用手机号验证码注册

```php
$phone = "phone number";
$code = "1234"; // 来自手机验证码
$user = $authenticationClient->registerByPhoneCode($phone, $code);
```

- 注册的同时设置密码

```php
$phone = "phone number";
$code = "1234";
$password = "123456";
$user = $authenticationClient->registerByPhoneCode($phone, $code, $password);
```

- 注册的同时设置用户资料（昵称和公司）

```php
use Authing\Types\RegisterProfile;

$profile = new RegisterProfile();
$profile->nickname = 'Nick';
$profile->company = '字节跳动';
$authenticationClient->registerByPhoneCode(
  '176xxxx6754',
  '1234',
  null,
  $profile,
);
```

- 注册的同时设置 `客户端真实 IP`

```php
$authenticationClient->registerByPhoneCode(
  '176xxxx6754',
  '1234',
  null,
  null,
  [
    'clientIp' => 'your ip'
  ]
);
```

## 使用邮箱登录

AuthenticationClient->loginByEmail(string $email, string $password, array $options = [])

使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项：

![](https://cdn.authing.cn/img/20210414145613.png)

如果你的用户池配置了登录失败检测，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。

#### 参数

- `email` \<string\> 邮箱
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<array\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<array\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<array\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。


#### 示例

```php
$email = "test@test.com";
$password = "123456";
$user = $authenticationClient->loginByEmail($email, $password);
```

## 使用用户名登录

AuthenticationClient->loginByUsername(string $username, string $password, array $options = [])

使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `profile` \<RegisterProfile\> 用户资料
- `options` \<array\>
- `options.forceLogin` \<boolean\> 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<array\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<array\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

- 使用用户名密码注册

```php
$username = "username";
$password = "123456";
$user = $authenticationClient->loginByUsername($username, $password);
```

## 使用手机号验证码登录

AuthenticationClient->loginByPhoneCode(string $phone, string $code)

使用手机号验证码登录。你需要先使用 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 短信验证码


#### 示例

```php
$phone = "phone number";
$code = "1234";
$user = $authenticationClient->loginByPhoneCode($phone, $code);
```

## 使用手机号密码登录

AuthenticationClient->loginByPhonePassword(string $phone, string $password, array $options = [])

如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（错误码 为 2000)。

#### 参数

- `phone` \<string\> 手机号
- `password` \<string\> 密码
- `options` \<array\>
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `options.customData` \<array\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<array\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```php
$phone = "17611161550";
$password = "123456";
$user = $authenticationClient->loginByPhonePassword($phone, $password);
```

## 使用子账户登录

AuthenticationClient->loginBySubAccount(string $account, string $password, array $options = [])

使用子账户登录。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码
- `options` \<array\> 配置对象，可选参数。
- `options.captchaCode` \<string\> 图形验证码
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。

#### 示例

```php
$authenticationClient = new AuthenticationClient({
  appId: 'APP_ID'
});

$authenticationClient->loginBySubAccount('admin', 'admin');
```

<!-- #### 返回值 -->

## 使用 LDAP 用户名登录

AuthenticationClient->loginByLdap(string $username, string $password)

使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。

点此查看[连接 LDAP 身份源](/connections/ldap/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```php
$data = $authentication->loginByLdap("test", "J@vascript1#!");
```

## 使用 AD 用户名登录

AuthenticationClient->loginByAd(string $username, string $password)

使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。

点此查看[连接 Active Directory 身份源](/connections/windows-active-directory/)文档。

#### 参数

- `username` \<string\> 用户名
- `password` \<string\> 密码

#### 示例

```php
$data = $authentication->loginByAd("test", "J@vascript1#!");
```

## 获取当前登录的用户信息

AuthenticationClient->getCurrentUser()

获取当前登录用户的用户信息，需要 AuthenticationClient 当前处于已登录状态才能获取到。你可以通过两种方式设置 AuthenticationClient 的登录状态：
1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，AuthenticationClient 会缓存用户的 [id_token](/concepts/id-token.md)，从而记住登录状态；
2. 通过用户的 [id_token](/concepts/id-token.md) 初始化 AuthenticationClient。

#### 参数

无

#### 示例

```php
$user = $authenticationClient->getCurrentUser();
```

## 退出登录

AuthenticationClient->logout()

用于用户退出登录，会执行以下操作：

1. 清空该用户在当前应用下的 session 会话信息；
2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 {{$localeConfig.brandName}} 接口无法获取到相关数据。

#### 参数

无

#### 示例

```php
$authenticationClient->logout();
```

## 发送短信验证码

AuthenticationClient->sendSmsCode($phone)

发送短信验证码, 目前仅支持国内手机号；该接口有接口频率限制，请勿频繁请求。

#### 参数

- `phone` \<string\>

#### 示例

```php
$phone = "phone number";
$message = $authenticationClient->sendSmsCode($phone);
```

## 发送邮件

AuthenticationClient->sendEmail($email, $scene)

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

```php
use Authing\Types\EmailScene;

$email = "test@example.com";
$authenticationClient->sendEmail($email, EmailScene::RESET_PASSWORD);
```

## 检查密码强度

AuthenticationClient->checkPasswordStrength($password)

判断密码是否符合密码强度要求。{{$localeConfig.brandName}} 中密码强度等级分为以下几种：

- 任意非空字符串；
- 至少 6 位字符；
- 至少 6 位字符，且须包含英文、数字与符号中的两种；
- 至少 6 位字符，且密码中须包含英文、数字与符号。

默认为任意非空字符，你可以查看 [密码安全](/guides/security/pw-security.md) 配置用户池的密码强度等级。

#### 参数

- `password` \<string\>

#### 示例

```php
$strength = $authentication->checkPasswordStrength('asdasd');

$strength = $authentication->checkPasswordStrength('php@-isok+_?');
```


## 获取自定义数据

AuthenticationClient->getUdfValue()

获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 示例

```php
$data = $authenticationClient->getUdfValue();
```

## 设置自定义数据

AuthenticationClient->setUdfValue(array $data)

设置用户的自定义字段。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `data` \<string\> 输入数据，类型为一个对象，详情请见示例。

#### 示例

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
    $opts->appHost = "https://xxx.authing.cn";
    $opts->token = "ID_TOKEN"; // 使用用户的 token 初始化 SDK
});
$authenticationClient->setUdfValue([
  'school' => '华中科技大学',
  'age' => 20,
]);
```

## 删除自定义数据

AuthenticationClient->removeUdfValue(string $key)

删除自定义数据。

#### 参数

- `key` \<string\> 自定义字段的 key 。

#### 示例

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
    $opts->appHost = "https://xxx.authing.cn";
    $opts->token = "ID_TOKEN"; // 使用用户的 token 初始化 SDK
});

$authenticationClient->removeUdfValue('school');
```

## 检测 Token 登录状态

AuthenticationClient->checkLoginStatus($token)

检测 Token 登录状态

#### 参数

- `token` \<string\> 用户的登录凭证 token

#### 示例

```php
$status = $authenticationClient->checkLoginStatus('TOKEN');
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

AuthenticationClient->resetPasswordByPhoneCode($phone, $code, $newPassword)

通过短信验证码重置密码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```php
$phone = "phone number";
$code = "1234";
$newPassword = "123456";
$authenticationClient->resetPasswordByPhoneCode($phone, $code, $newPassword);
```

## 通过邮件验证码重置密码

AuthenticationClient->resetPasswordByEmailCode($email, $code, $newPassword)

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

#### 参数

- `email` \<string\> 邮箱
- `code` \<string\> 验证码
- `newPassword` \<string\> 新的密码

#### 示例

```php
$email = "test@example.com";
$code = "1234";
$newPassword = "123456";
$authenticationClient->resetPasswordByEmailCode($email, $code, $newPassword);
```

## 修改用户资料

AuthenticationClient->updateProfile($updates)

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

```php
$user = $authenticationClient->updateProfile((new UpdateUserInput())->withNickname("nickname"));
```

## 更新用户密码

AuthenticationClient->updatePassword($newPassword, $oldPassword)

更新用户密码

#### 参数

- `newPassword` \<string\> 新密码
- `oldPassword` \<string\> 旧密码，如果用户没有设置密码，可以不填。

#### 示例

```php
$oldPassword = "111111";
$newPassword = "123456";
$user = $authenticationClient->updatePassword($newPassword, $oldPassword);
```

## 绑定手机号

AuthenticationClient->bindPhone($phone, $phoneCode)

用户初次绑定手机号，如果需要修改手机号请使用 [updatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [sendSmsCode](#发送短信验证码) 方法。

终端用户也可以[在个人中心自助绑定手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `phone` \<string\>
- `phoneCode` \<string\>

#### 示例

```php
$user = $authenticationClient->bindPhone("phone number", "1234");
```

## 解绑手机号

AuthenticationClient->unbindPhone()

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

终端用户也可以[在个人中心自助解绑手机号](/guides/user/manage-profile.md#绑定手机号)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

无

#### 示例

```php
$user = $authenticationClient->unBindPhone();
```

## 更新用户手机号

AuthenticationClient->updatePhone($phone, $phoneCode, $oldPhone, $oldPhoneCode)

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

#### 示例

```php
$user = $authenticationClient->updatePhone("new phone number", "1234", "old phone number", "1234");
```

## 绑定邮箱

AuthenticationClient->bindEmail(string $email, string $emailCode)

用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [updateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [sendEmail](#发送邮件) 方法。

终端用户也可以[在个人中心自助绑定邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

- `email` \<string\> 邮箱
- `emailCode` \<string\> 邮件验证码，可通过 [sendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL。

#### 示例

```php
$authenticationClient->bindEmail('test@example.com', '1234');
```

<!-- #### 返回值 -->

## 解绑邮箱

AuthenticationClient->unbindEmail(string $email, string $emailCode)

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

终端用户也可以[在个人中心自助解绑邮箱](/guides/user/manage-profile.md#绑定邮箱)：

![](https://cdn.authing.cn/blog/20201019200112.png)

#### 参数

无

#### 示例

```php
$user = $authenticationClient->getCurrentUser();

if (!empty($user)) {
  $authenticationClient->unbindEmail();
}
```

<!-- #### 返回值 -->

## 更新用户邮箱

AuthenticationClient->updateEmail($email, $emailCode, $oldEmail, $oldEmailCode)

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

```php
$newEmail = "new@example.com";
$emailCode = "1234";
$user = $authenticationClient->updateEmail($newEmail, $emailCode);
```

## 合并账号身份信息

AuthenticationClient->linkAccount($options)

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

#### 参数

- `options.primaryUserToken` \<string\> 主账号 Token
- `options.secondaryUserToken` \<string\> 子账号 Token

#### 示例

```php
$_ = new stdClass;
$_->primaryUserToken = "";
$_->secondaryUserToken = "";
// (object)[
//    'primaryUserToken' => '',
//    'secondaryUserToken' => '',
// ]

$data = $authentication->linkAccount($_);
```

<!-- ## 解绑社交账号

AuthenticationClient->unLinkAccount(array $options)

主账号解绑社会化登录账号。

#### 参数

- `options.primaryUserToken` \<string\> 主账号用户的 `id_token`；
- `options.provider` \<string\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)。

#### 示例

```php
$authenticationClient->unLinkAccount([
  'primaryUserToken' => $authenticationClient->getToken(),
  'provider' => 'github'
]);
```

#### 返回值

```json
{
  "code": 200,
  "message": "绑定成功"
}
``` -->

## 获取用户所在组织机构

AuthenticationClient->listOrg()

获取用户所在的组织机构列表，以及他所属的节点在此组织机构内的完整路径。

#### 参数

无

#### 示例

```php
$data = $authentication->listOrg();
```


## 计算密码安全等级

AuthenticationClient->computedPasswordSecurityLevel($password)

计算密码安全等级。

#### 参数

`password`: 需要计算的密码，必须为 `string` 类型

#### 示例

```php
$data = $authentication->computedPasswordSecurityLevel('J@vascript1#!');
```

#### 返回数据

- `1`: 等级低
- `2`: 等级中
- `3`: 等级高

## 获取用户账号安全等级

AuthenticationClient->getSecurityLevel()

获取用户账号安全等级

#### 参数

无

#### 示例

```php
$authentication = new AuthenticationClient(function ($options) {
    $options->appId = "YOUR_APP_ID";
    $options->secret = "YOUR_APP_SECRET";
    $options->host = "YOUR_NEED_HOST";
    $options->redirectUri = "YOUR_REDIRECTURI";
    $options->protocol = "YOUR_PROTOCOL";
    // ...
});
$user = $authentication->loginByUsername(new LoginByUsernameInput("shubuzuo", "123456"));

// 保证已经登录
$data = $authentication->getSecurityLevel();
```

#### 示例数据

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

AuthenticationClient->listAuthorizedResources($namespace)

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```php
$data = $authentication->listAuthorizedResources('namespace');
```

#### 示例数据

- `type` 为资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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

AuthenticationClient->listApplications(array $params)

获取当前用户能够访问的应用。

#### 参数

- `params` \<array\> 参数数组
- `params.page` \<number\> 分页序号, 默认为 `1`。
- `params.limit` \<number\> 每页返回的个数, 默认为 `10`。

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- 需要额外执行登录操作

#### 示例

```php
$client = new AuthenticationClient(function($options) {
    $options->appId = 'YOUR_APPID';
});

// 登录用户
// 可以使用其他方式登录
$client->loginByUsername(new LoginByUsernameInput('username', 'password'));

// $params 可以为空，此时采用默认值
$client->listApplications([
    'page': 1,
    'limit': 10,
]);
```

#### 示例数据

正常时返回：

```json
{
  "code": 200,
  "message": "获取可访问的应用列表成功",
  "data": {
    "list": {
      "0": {
        "id": "5f97fb40d352ecf69ffe6d98",
        "name": "oo",
        "logo": "https://files.authing.co/authing-console/default-app-logo.png",
        "domain": "okokiohutuyfrtd",
        "description": null,
        "createdAt": "2020-10-27T10:49:36.817Z",
        "updatedAt": "2021-03-17T10:39:53.650Z",
        "protocol": "oidc"
      }
    },
    "totalCount": 1
  }
}
```
