# 多因素认证模块

<LastUpdated/>

此模块用于为用户绑定、解绑 TOTP、短信、邮箱、人脸识别等二次认证器。例如用户存在异地行为时，你希望让用户进行二次身份认证，目前 Authing 支持多种二次验证的方式，包括 TOTP、短信、邮箱、人脸识别等。

示例代码：

```go
authenticationClient := NewClient(AppId, Secret)
authenticationClient.userPoolId = UserPool

authenticationClient.GetMfaAuthenticators;
authenticationClient.AssosicateMfaAuthenticator;
authenticationClient.VerifyTotpMfa;
authenticationClient.VerifyFaceMfa;
authenticationClient.AssociateFaceByLocalFile;
authenticationClient.AssociateFaceByBlob;
authenticationClient.AssociateFaceByUrl;
authenticationClient.VerifyTotpRecoveryCode;
authenticationClient.PhoneOrEmailBindable;
authenticationClient.VerifyAppEmailMfa;
authenticationClient.VerifyAppSmsMfa;
authenticationClient.ConfirmAssosicateMfaAuthenticator;
authenticationClient.DeleteMfaAuthenticator;
```

## 获取 MFA 认证器

```go
// GetMfaAuthenticators
// 获取 MFA 认证器
func (c *Client) GetMfaAuthenticators(req *model.MfaInput) (*struct {
	Message string                               `json:"message"`
	Code    int64                                `json:"code"`
	Data    []model.GetMfaAuthenticatorsResponse `json:"data"`
}, error) 
```

获取 MFA 认证器
#### 参数
- `req` \<MfaInput\> 请求
- `MfaInput.MfaToken` \<*string\> Token
- `MfaInput.MfaType`  \<*string\> 类型
- `MfaInput.MfaSource`  \<*MfaSource\> 数据源

#### 示例

```go
token :="token"
resp, err := authenticationClient.GetMfaAuthenticators(&model.MfaInput{
		MfaToken: &token,
})
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

```go
// AssociateMfaAuthenticator
// 请求 MFA 二维码和密钥信息
func (c *Client) AssociateMfaAuthenticator(req *model.MfaInput) (*struct {
	Message string                                  `json:"message"`
	Code    int64                                   `json:"code"`
	Data    model.AssociateMfaAuthenticatorResponse `json:"data"`
}, error)
```

请求 MFA 二维码和密钥信息
#### 参数
- `req` \<MfaInput\> 请求
- `MfaInput.MfaToken` \<*string\> Token
- `MfaInput.MfaType`  \<*string\> 类型
- `MfaInput.MfaSource`  \<*MfaSource\> 数据源

#### 示例

```go
token:="token"
resp, err := authenticationClient.AssociateMfaAuthenticator(&model.MfaInput{
		MfaToken: &token,
})
```
#### 示例数据
```json
{
  "message": "获取 MFA 密钥成功",
  "code": 200,
  "data": {
    "recovery_code": "bc5a-xxx-617a-6e94-9dd1-9dd2",
    "authenticator_type": "totp",
    "qrcode_data_url": "data:image/png;base64,iVBO Wse1lrXPKyxxdc3DWuuah7XWNQ9rrWse1lrX/B//adHsf5AaswAAAABJRU5ErkJggg==",
    "secret": "JRYQWOZNxxxQOAO",
    "qrcode_uri": "otpauth://totp/newSDK:fptvm K"
  }
}
```



## 解绑 MFA

```go
// DeleteMfaAuthenticator
// 解绑 MFA
func (c *Client) DeleteMfaAuthenticator() (*model.CommonMessageAndCode, error)
```

解绑 MFA
#### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	resp, err := authenticationClient.DeleteMfaAuthenticator()
```
#### 示例数据
```json
{
  "message": "TOTP MFA 解绑成功",
  "code": 200
}
```

## 确认绑定 MFA

```go
// ConfirmAssociateMfaAuthenticator
// 确认绑定 MFA
func (c *Client) ConfirmAssociateMfaAuthenticator(req *model.ConfirmAssociateMfaAuthenticatorRequest) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

确认绑定 MFA

#### 参数

- `req` \<ConfirmAssociateMfaAuthenticatorRequest\> 请求
- `ConfirmAssociateMfaAuthenticatorRequest.Totp` \<string\> 验证码
- `ConfirmAssociateMfaAuthenticatorRequest.AuthenticatorType`  \<*string\> 类型
- `ConfirmAssociateMfaAuthenticatorRequest.MfaSource`  \<*MfaSource\> 数据源
- `ConfirmAssociateMfaAuthenticatorRequest.MfaToken`  \<*string\> Token

#### 示例

```go
resp, err := authenticationClient.ConfirmAssociateMfaAuthenticator(&model.ConfirmAssociateMfaAuthenticatorRequest{
		Totp: "D5LH4GQQGEEWEHKX", 
})
```

## 检验二次验证 MFA 口令

```go
// VerifyTotpMfa
// 检验二次验证 MFA 口令
func (c *Client) VerifyTotpMfa(totp, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

检验二次验证 MFA 口令

#### 参数
- `totp` \<string\> 验证码
- `token`  \<string\> Token

#### 示例

```go
mfaToken := "x.x.2DbmVf1-JQeiRMpZBk-3y-uPIN15FL-ranE4UlMKMoM"
resp, err := authenticationClient.VerifyTotpMfa("q", mfaToken)
```


## 检验二次验证 MFA 短信验证码

```go
// VerifyAppSmsMfa
// 检验二次验证 MFA 短信验证码
func (c *Client) VerifyAppSmsMfa(phone, code, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

检验二次验证 MFA 短信验证码

#### 参数
- `phone` \<string\> 手机号
- `code` \<string\> 验证码
- `token`  \<string\> Token

#### 示例

```go
resp, err := authenticationClient.VerifyAppSmsMfa("777777", "q", "token")
```



## 检验二次验证 MFA 邮箱验证码

```go
// VerifyAppEmailMfa
// 检验二次验证 MFA 邮箱验证码
func (c *Client) VerifyAppEmailMfa(email, code, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error) 
```

检验二次验证 MFA 邮箱验证码

#### 参数
- `email` \<string\> 邮箱
- `code` \<string\> 验证码
- `token`  \<string\> Token

#### 示例

```go
mfaToken:="token"
resp, err := authenticationClient.VerifyAppEmailMfa("gosdk@mail.com", "q", mfaToken)
```



## 检测手机号或邮箱是否已被绑定

```go
// PhoneOrEmailBindable
// 检测手机号或邮箱是否已被绑定
func (c *Client) PhoneOrEmailBindable(email, phone *string, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

检测手机号或邮箱是否已被绑定

#### 参数
- `email` \<*string\> 邮箱
- `phone` \<*string\> 手机号
- `token`  \<string\> Token

#### 示例

```go
mfaToken := "x.2DbmVf1-JQeiRMpZBk-3y-uPIN15FL-x"
email := "gosdk@mail.com"
resp, err := authenticationClient.PhoneOrEmailBindable(&email, nil, mfaToken)
```




## 检验二次验证 MFA 恢复代码

```go
// VerifyTotpRecoveryCode
// 检验二次验证 MFA 恢复代码
func (c *Client) VerifyTotpRecoveryCode(code, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

检验二次验证 MFA 恢复代码

#### 参数
- `code` \<string\> 恢复验证码
- `token`  \<string\> Token

#### 示例

```go
	mfaToken := "x.x.2DbmVf1-JQeiRMpZBk-3y-x-ranE4UlMKMoM"
	resp, err := authenticationClient.VerifyTotpMfa("eedc-xxx-931b-xxx-xx-46ae", mfaToken)
```



## 通过图片 URL 绑定人脸

```go
// AssociateFaceByUrl
// 通过图片 URL 绑定人脸
func (c *Client) AssociateFaceByUrl(baseFaceUrl, CompareFaceUrl, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```

通过图片 URL 绑定人脸

#### 参数
- `baseFaceUrl` \<string\> 基础照片
- `CompareFaceUrl` \<string\> 对比照片
- `token`  \<string\> Token

#### 示例

```go
resp, err := authenticationClient.AssociateFaceByUrl("http://tp", "http://zp", mfaToken)
```



## 人脸二次认证

```go
// VerifyFaceMfa
// 人脸二次认证
func (c *Client) VerifyFaceMfa(faceUrl, token string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error) 
```

人脸二次认证

#### 参数
- `faceUrl` \<string\> 头像
- `token`  \<string\> Token

#### 示例

```go
resp, err := authenticationClient.VerifyFaceMfa("http://face", mfaToken)
```
