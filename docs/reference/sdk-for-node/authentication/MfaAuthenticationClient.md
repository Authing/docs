# 多因素认证模块

<LastUpdated/>

此模块用于为用户绑定、解绑 TOTP、短信、邮箱、人脸识别等二次认证器。例如用户存在异地行为时，你希望让用户进行二次身份认证，目前 Authing 支持多种二次验证的方式，包括 TOTP、短信、邮箱、人脸识别等。

示例代码：

```javascript
import { AuthenticationClient } from 'authing-js-sdk';
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});

authenticationClient.mfa.getMfaAuthenticators;
authenticationClient.mfa.assosicateMfaAuthenticator;
authenticationClient.mfa.verifyTotpMfa;
authenticationClient.mfa.verifyFaceMfa;
authenticationClient.mfa.associateFaceByLocalFile;
authenticationClient.mfa.associateFaceByBlob;
authenticationClient.mfa.associateFaceByUrl;
authenticationClient.mfa.verifyTotpRecoveryCode;
authenticationClient.mfa.phoneOrEmailBindable;
authenticationClient.mfa.verifyAppEmailMfa;
authenticationClient.mfa.verifyAppSmsMfa;
authenticationClient.mfa.confirmAssosicateMfaAuthenticator;
authenticationClient.mfa.deleteMfaAuthenticator;
```

## TOTP 认证器

### 获取 TOTP 认证器信息
> 获取 TOTP MFA 认证器

```js
MfaAuthenticationClient().getMfaAuthenticators()
```


#### 参数
- `options`: \<object\>
  - `options.totp`: \<string\>，totp 恢复代码。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.getMfaAuthenticators({
  type: 'totp',
});
```

#### 返回值

- `Promise<IMfaAuthenticators>`

### 请求绑定 TOTP 认证器
> 请求 TOTP MFA 二维码和密钥信息，从而完成绑定
```js
MfaAuthenticationClient().assosicateMfaAuthenticator(options)
```


#### 参数

- `options`: \<object\>
  - `options.authenticatorType`: [\<string\>]，绑定的 MFA 类型，只能传 'totp'。
  - `options.mfaToken`: [\<string\>]，未登录绑定 MFA 时后端返回的 mfaToken。
  - `options.source`: [\<string\>]，从应用绑定还是个人中心绑定，可选值为 'APPLICATION'、'SELF'，默认为 'SELF'。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator({ authenticatorType: 'totp' });
```

#### 返回值

- `Promise<IMfaAssociation>`

### 确认绑定 TOTP 认证器
> 确认绑定 TOTP 认证器

```js
MfaAuthenticationClient().confirmAssosicateMfaAuthenticator()
```


#### 参数

- `options`: \<object\>
  - `options.totp`: \<string\>，totp 码。
  - `options.authenticatorType`: \<string\>，绑定的 MFA 类型，只能传 'totp'。
  - `options.mfaToken`: \<string\>，未登录绑定 MFA 时后端返回的 mfaToken。
  - `options.source`: \<string\>，从应用绑定还是个人中心绑定，可选值为 'APPLICATION'、'SELF'，默认为 'SELF'。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator({ authenticatorType: 'totp', totp: '112233' });
```

#### 返回值

- `Promise<IMfaConfirmAssociation>`

### 检验 TOTP 认证器口令
> 检验二次验证 TOTP 口令
```js
MfaAuthenticationClient().verifyTotpMfa()
```


#### 参数

- `options`: \<object\>
  - `options.totp`: \<string\>，totp 码。
  - `options.authenticatorType`: \<string\>，绑定的 MFA 类型，只能传 'totp'。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.verifyTotpMfa({
  authenticatorType: 'totp',
  totp: '112233',
});
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 检验 TOTP 认证器恢复代码
> 检验二次验证 TOTP MFA 恢复代码

```js
MfaAuthenticationClient().verifyTotpRecoveryCode()
```


#### 参数

- `options`: \<object\>
  - `options.totp`: \<string\>，totp 恢复代码。
  - `options.authenticatorType`: \<string\>，绑定的 MFA 类型，只能传 'totp'。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({
  authenticatorType: 'totp',
  totp: '112233',
});
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 解绑 MFA
> 解绑 TOTP MFA

```js
MfaAuthenticationClient().deleteMfaAuthenticator()
```
#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator();
```

#### 返回值

- `Promise<IMfaDeleteAssociation>`

## 手机验证码认证器

### 检验短信验证码认证器口令
> 检验二次验证 MFA 短信验证码

```js
MfaAuthenticationClient().verifyAppSmsMfa()
```


#### 参数

- `options` \<Object\>
- `options.phone` \<string\> 用户手机号。
- `options.code` \<string\> 手机验证码。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.verifySmsMfa({
  mfaToken: 'xxxxxx',
  phone: '173xxxxxxxx',
  code: 'xxxx',
});
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)
### 检测手机号是否已被绑定
> 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证
```js
MfaAuthenticationClient().phoneOrEmailBindable()
```


#### 参数

- `options` \<Object\>
- `options.phone` \<string\> 要检测的手机号。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.phoneOrEmailBindable({
  mfaToken: 'xxxxxx',
  phone: '手机号',
});
```

#### 返回值

- `Promise<boolean>`

## 邮箱认证器

### 检验邮箱验证码认证器口令
> 检验二次验证 TOTP MFA 邮箱验证码

```js
MfaAuthenticationClient().verifyAppEmailMfa()
```


#### 参数

- `options` \<Object\>
- `options.email` \<string\> 用户邮箱。
- `options.code` \<string\> 手机验证码。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.verifyAppEmailMfa({
  mfaToken: 'xxxxxx',
  email: 'example@authing.cn',
  code: 'xxxx',
});
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 检测邮箱是否已被绑定
> 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证

```js
MfaAuthenticationClient().phoneOrEmailBindable()
```


#### 参数

- `options` \<Object\>
- `options.email` \<string\> 要检测的邮箱。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.phoneOrEmailBindable({
  mfaToken: 'xxxxxx',
  email: 'example@authing.cn',
});
```

#### 返回值

- `Promise<boolean>`

## 人脸认证器

### 通过图片 URL 绑定人脸
> 通过图片 URL 绑定人脸

```js
MfaAuthenticationClient().associateFaceByUrl(options)
```


#### 参数

- `options` \<object\>
  - `options.baseFace` \<string\>，基础人脸图片链接
  - `options.compareFace` \<string\>，人脸图片对比链接，用于对比确认基础人脸图片
  - `options.mfaToken` \<string\>，可选，在用户二次登录认证绑定人脸时传入

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.associateFaceByUrl({
  baseFace: 'https://example.com/photo/photoA.jpg',
  compareFace: 'https://example.com/photo/photoB.jpg',
  mfaToken: 'xxxxx',
});
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 通过 Blob 流对象绑定人脸
> 通过 Blob 流对象绑定人脸

```js
MfaAuthenticationClient().associateFaceByBlob(options)
```


#### 参数

- `options` \<object\>
  - `options.baseFace` \<Blob\>，基础人脸信息 `Blob` 对象
  - `options.compareFace` \<Blob\>，人脸信息 `Blob` 对象，用于对比确认基础人脸
  - `options.mfaToken` \<string\>，可选，在用户二次登录认证绑定人脸时传入

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.associateFaceByBlob({
  baseFace: new Blob(...),
  compareFace: new Blob(...),
  mfaToken: 'xxxxx',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 通过上传本地文件绑定人脸
> 通过上传本地文件绑定人脸，会在浏览器自动弹出文件选择框

```js
MfaAuthenticationClient().associateFaceByLocalFile()
```

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.associateFaceByLocalFile();
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

### 检验人脸认证器
> 检测二次登录人脸验证

```js
MfaAuthenticationClient().verifyFaceMfa(url)
```

#### 参数

`url` \<string\>，人脸图片地址

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
const authenticators = await authenticationClient.mfa.verifyFaceMfa('http://example.com/photo/photo.jpg');
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)
