# 多因素认证模块

<LastUpdated/>

此模块用于为用户绑定、解绑 TOTP、短信、邮箱、人脸识别等二次认证器。例如用户存在异地行为时，你希望让用户进行二次身份认证，目前 Authing 支持多种二次验证的方式，包括 TOTP、短信、邮箱、人脸识别等。

## 初始化
```csharp
using Authing.ApiClient.Domain.Client.Impl.AuthenticationClient;

var authenticationClient = new MfaAuthenticationClient(
  opt =>
        {
          opt.AppId = "AUTHING_APP_ID",
          opt.AppHost: 'https://xxx.authing.cn',
        }
);
```

## TOTP 认证器

### 获取 TOTP 认证器信息
```csharp
authenticationClient.GetMfaAuthenticators(GetMfaAuthenticatorsParam getMfaAuthenticatorsParam)
```
> 获取 TOTP MFA 认证器

#### 参数
- `option`: \<GetMfaAuthenticatorsParam\>
- `option.Type`: \<string\>，totp 恢复代码。
- `option.MfaToken`: \<string\>
- `option.TotpSource`: \<TotpSourceEnum\>

#### 示例

```csharp
var option = new GetMfaAuthenticatorsParam(){};
var result = await authenticationClient.GetMfaAuthenticators(option);
```


### 请求绑定 TOTP 认证器

```csharp
authenticationClient.AssosicateMfaAuthenticator(AssosicateMfaAuthenticatorParam option);
```
> 请求 TOTP MFA 二维码和密钥信息，从而完成绑定

#### 参数

- `option`: \<AssosicateMfaAuthenticatorParam\>
- `option.AuthenticatorType`: [\<string\>]，绑定的 MFA 类型，只能传 "totp"。
- `option.MfaToken`: [\<string\>]，未登录绑定 MFA 时后端返回的 mfaToken。
- `option.TotpSource`: [\<string\>]，从应用绑定还是个人中心绑定，可选值为 "APPLICATION"、"SELF"，默认为 "SELF"。

#### 示例

```csharp
var option = new AssosicateMfaAuthenticatorParam(){};
var result = await authenticationClient.AssosicateMfaAuthenticator(option);
```


### 确认绑定 TOTP 认证器
```csharp
authenticationClient.ConfirmAssosicateMfaAuthenticator(ConfirmAssosicateMfaAuthenticatorParam option);
```
> 确认绑定 TOTP 认证器

#### 参数

- `option`: \<ConfirmAssosicateMfaAuthenticatorParam\>
- `option.Totp`: \<string\>，totp 码。
- `option.AuthenticatorType`: \<string\>，绑定的 MFA 类型，只能传 "totp"。
- `option.MfaToken`: \<string\>，未登录绑定 MFA 时后端返回的 mfaToken。
- `option.TotpSource`: \<string\>，从应用绑定还是个人中心绑定，可选值为 "APPLICATION"、"SELF"，默认为 "SELF"。

#### 示例

```csharp
var option = new ConfirmAssosicateMfaAuthenticatorParam(){
  Totp = "TotpCode",
  TotpSource = "APPLICATION"
};
var result = await authenticationClient.ConfirmAssosicateMfaAuthenticator(option);
```


### 检验 TOTP 认证器恢复代码
```csharp
authenticationClient.VerifyTotpRecoveryCode(VerifyTotpRecoveryCodeParam option)
```
> 检验二次验证 TOTP MFA 恢复代码

#### 参数

- `option`: \<VerifyTotpRecoveryCodeParam\>
  - `option.RecoveryCode`: \<string\>
  - `option.MfaToken`: \<string\>

#### 示例

```csharp
var option = new VerifyTotpRecoveryCodeParam(){
  RecoveryCode = "RecoveryCode",
  MfaToken = "MfaToken"
};
var authenticators = await authenticationClient.VerifyTotpRecoveryCode(option);
```

### 解绑 MFA
```csharp
DeleteMfaAuthenticator.DeleteMfaAuthenticator()
```
> 解绑 TOTP MFA

#### 参数

#### 示例

```csharp
var result = await authenticationClient.DeleteMfaAuthenticator();
```


## 手机验证码认证器

### 检验短信验证码认证器口令
```csharp
authenticationClient.VerifyAppSmsMfa(VerifyAppSmsMfaParam option)
```
> 检验二次验证 MFA 短信验证码

#### 参数

- `option` \<VerifyAppSmsMfaParam\>
- `option.Phone` \<string\> 用户手机号。
- `option.Code` \<string\> 手机验证码。
- `option.MfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```csharp
var option = new VerifyAppSmsMfaParam(){
  Phone = "Phone",
  Code = "Code",
  MfaToken = "MfaToken"
};
var authenticators = await authenticationClient.VerifyAppSmsMfa(option);
```

## 邮箱认证器

### 检验邮箱验证码认证器口令

```csharp
authenticationClient.VerifyAppEmailMfa(VerifyAppEmailMfaParam option);
```
> 检验二次验证 TOTP MFA 邮箱验证码

#### 参数

- `option` \<VerifyAppEmailMfaParam\>
- `option.Email` \<string\> 用户邮箱。
- `option.Code` \<string\> 手机验证码。
- `option.MfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```csharp
var option = new VerifyAppEmailMfaParam(){
  Email = "Email",
  Code = "Code",
  MfaToken = "MfaToken"
};
var result = await authenticationClient.VerifyAppEmailMfa(option);
```


### 检测邮箱是否已被绑定
```csharp
authenticationClient.PhoneOrEmailBindable(PhoneOrEmailBindableParam phoneOrEmailBindableParam);
```
> 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证

#### 参数

- `option` \<PhoneOrEmailBindableParam\>
- `option.Email` \<string\> 要检测的邮箱。
- `option.MfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```csharp
var option = new PhoneOrEmailBindableParam(){
  Email = "Email",
  MfaToken = "MfaToken"
};
var result = await authenticationClient.PhoneOrEmailBindable(option);
```

## 人脸认证器

### 通过图片 URL 绑定人脸
```csharp
authenticationClient.AssociateFaceByUrl(AssociateFaceByUrlParams option);
```
> 通过图片 URL 绑定人脸

#### 参数

- `option` \<AssociateFaceByUrlParams\>
  - `option.BaseFace` \<string\>，基础人脸图片链接
  - `option.CompareFace` \<string\>，人脸图片对比链接，用于对比确认基础人脸图片
  - `option.MFAToken` \<string\>，可选，在用户二次登录认证绑定人脸时传入

#### 示例

```csharp
var option = new AssociateFaceByUrlParams(){
  BaseFace = "BaseFace",
  CompareFace = "CompareFace"
};
var authenticators = await authenticationClient.AssociateFaceByUrl(option);
```
### 检验人脸认证器
```csharp
authenticationClient.VerifyFaceMfa(string photo, string mfaToken);
```
> 检测二次登录人脸验证

#### 参数

- `photo` \<string\>，人脸图片地址
- `mfaToken` \<string\>

#### 示例

```csharp
var authenticators = await authenticationClient.VerifyFaceMfa("http://example.com/photo/photo.jpg","mfaToken");
```

### 检验二次验证 MFA 口令
```csharp
authenticationClient.VerifyTotpMfa(VerifyTotpMfaParam option)
```
> 检验二次验证 MFA 口令

#### 参数

- `option` \<VerifyTotpMfaParam\>
- `option.MfaToken` \<string\> 未登录绑定 MFA 时后端返回的 mfaToken。
- `option.Totp` \<string\> totp 码。

#### 示例

```csharp
var option =  new VerifyTotpMfaParam(){
  Totp = "Totp",
  MfaToken = "MfaToken"
};
var authenticators = await authenticationClient.VerifyTotpMfa(option)
```

