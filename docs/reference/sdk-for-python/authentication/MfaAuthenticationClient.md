# 多因素认证模块

<LastUpdated/>

此模块用于为用户绑定、解绑 TOTP、短信、邮箱、人脸识别等二次认证器。例如用户存在异地行为时，你希望让用户进行二次身份认证，目前 Authing 支持多种二次验证的方式，包括 TOTP、短信、邮箱、人脸识别等。

示例代码：

```javascript
import { AuthenticationClient } from 'authing-js-sdk';
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
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

## 获取 MFA 认证器

```python
def get_mfa_authenticators(self, mfa_token=None, type='totp', source='SELF'):
  pass
```

获取 MFA 认证器
#### 参数
- `mfa_token` \<str\> Token
- `type`  \<str\> 类型
- `source`  \<str\> 数据源

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.get_mfa_authenticators(mfa_token=tt['token'])
```
#### 示例数据
```json
{
	"code": 200,
	"message": "获取 MFA Authenticator 成功",
	"data": [{
		"id": "6176585c29629448d5fc8b37",
		"createdAt": "2021-10-25T07:10:20.892Z",
		"updatedAt": "2021-10-25T07:11:33.142Z",
		"userId": "61418763xx979c3740",
		"enable": false,
		"secret": "D5LH4xxWEHKX",
		"authenticatorType": "totp",
		"recoveryCode": "c833-xxxx-9180-7240-a048-ebe6",
		"source": "SELF"
	}]
}
```



## 请求 MFA 二维码和密钥信息

```python
def assosicate_mfa_authenticator(self, mfa_token=None, authenticator_type='totp', source='SELF'):
  pass
```

请求 MFA 二维码和密钥信息
#### 参数
- `mfa_token` \<str\> Token
- `authenticator_type`  \<str\> 类型
- `source`  \<str\> 数据源

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
res = self.authentication.assosicate_mfa_authenticator(tt['token'])
```
#### 示例数据
```json
{
  "message": "获取 MFA 密钥成功",
  "code": 200,
  "data": {
    "recovery_code": "bc5a-6879-617a-6e94-9dd1-9dd2",
    "authenticator_type": "totp",
    "qrcode_data_url": "data:image/png;base64,iVBO Wse1lrXPKy1rnlYa13zsNa65mGtdc3DWuuah7XWNQ9rrWse1lrX/B//adHsf5AaswAAAABJRU5ErkJggg==",
    "secret": "JRYQWOZNJMQXQOAO",
    "qrcode_uri": "otpauth://totp/newSDK:fptvm K"
  }
}
```



## 解绑 MFA

```python
def delete_mfa_authenticator(self):
  pass
```

解绑 MFA
#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
res = authentication.delete_mfa_authenticator()
```
#### 示例数据
```json
{
  "message": "TOTP MFA 解绑成功",
  "code": 200
}
```

## 确认绑定 MFA

```python
def confirm_assosicate_mfa_authenticator(self,
                                           totp,
                                           authenticator_type='totp',
                                           source='SELF',
                                           mfa_token=None):
  pass
```

确认绑定 MFA

#### 参数
- `totp` \<str\> 验证码
- `authenticator_type`  \<str\> 类型
- `source`  \<str\> 数据源
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.confirm_assosicate_mfa_authenticator(tt['token'])
```

## 检验二次验证 MFA 口令

```python
def verify_totp_mfa(self, totp, mfa_token):
  pass
```

检验二次验证 MFA 口令

#### 参数
- `totp` \<str\> 验证码
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.verify_totp_mfa("",tt['token'])
```


## 检验二次验证 MFA 短信验证码

```python
def verify_app_sms_mfa(self, phone, code, mfa_token):
  pass
```

检验二次验证 MFA 短信验证码

#### 参数
- `phone` \<str\> 手机号
- `code` \<str\> 验证码
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.verify_app_sms_mfa("phone","11",tt['token'])
```



## 检验二次验证 MFA 邮箱验证码

```python
def verify_app_email_mfa(self, email, code, mfa_token):
  pass
```

检验二次验证 MFA 邮箱验证码

#### 参数
- `email` \<str\> 邮箱
- `code` \<str\> 验证码
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.verify_app_email_mfa("email","11",tt['token'])
```



## 检测手机号或邮箱是否已被绑定

```python
def phone_or_email_bindable(self, mfa_token, phone=None, email=None):
  pass
```

检测手机号或邮箱是否已被绑定

#### 参数
- `email` \<str\> 邮箱
- `phone` \<str\> 手机号
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.phone_or_email_bindable("email",tt['token'])
```




## 检验二次验证 MFA 恢复代码

```python
def verify_totp_recovery_code(self, recovery_code, mfa_token):
  pass
```

检验二次验证 MFA 恢复代码

#### 参数
- `recovery_code` \<str\> 恢复验证码
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.verify_totp_recovery_code("xxx",tt['token'])
```



## 通过图片 URL 绑定人脸

```python
def associate_face_by_url(self, base_face, compare_face, mfa_token=None):
  pass
```

通过图片 URL 绑定人脸

#### 参数
- `base_face` \<str\> 基础照片
- `compare_face` \<str\> 对比照片
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.associate_face_by_url("url",otherUrl",tt['token'])
```



## 人脸二次认证

```python
def verify_face_mfa(self, photo, mfa_token):
  pass
```

人脸二次认证

#### 参数
- `photo` \<str\> 头像
- `mfa_token`  \<str\> Token

#### 示例

```python
tt = self.authentication.login_by_email("test@example.com", "pwd")
authentication.verify_face_mfa("otherUrl",tt['token'])
```
