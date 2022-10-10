# 多因素认证 API

<LastUpdated/>

## MFA 检测

检测手机号或者邮箱是否可以被用作 MFA

```swift
func mfaCheck(phone: String?, email: String?, completion: @escaping(Int, String?, Bool?) -> Void)
```

**参数**

* *phone* 被检测的手机号。可以为空
* *email* 被检测的邮箱。可以为空

**示例**

```swift
AuthClient().mfaCheck(phone: "188xxxx8888", email: nil) { code, message, ok in
    if (code == 200) {
        if (ok) {
            
        }
    }
}

AuthClient().mfaCheck(phone: nil, email: "test@example.com") { code, message, ok in
    if (code == 200) {
        if (ok) {
            
        }
    }
}
```

<br>

## 短信验证

通过短信进行多因素认证

```swift
func mfaVerifyByPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号码
* *code* 短信验证码

**示例**

```swift
AuthClient().mfaVerifyByPhone(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>

## 邮箱验证

通过邮件验证码进行多因素认证

```swift
func mfaVerifyByEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```swift
AuthClient().mfaVerifyByEmail(email: "test@example.com", code: "1234") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>

## TOTP 验证

通过一次性密码 TOTP (Time-based One Time Password) 进行多因素认证

```swift
func mfaVerifyByOTP(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *code* TOTP code

**示例**

```swift
AuthClient().mfaVerifyByTOTP(code: "1234") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>

## 恢复码验证

用户在绑定 TOTP 时会得到一个恢复码，用户需要安全保存该恢复码，在调用此 API 时，将其作为参数传入。

注意，恢复码验证成功后，会生成新的恢复码，旧的恢复码失效

```swift
func mfaVerifyByRecoveryCode(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *code* 恢复码

**示例**

```swift
AuthClient().mfaVerifyByRecoveryCode(code: "1234") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>

## 上传人脸照片

人脸识别之前上传照片，此接口返回照片的 `Key` 值，用做人脸校验。

```swift
func uploadFaceImage(_ image: UIImage,_ isPrivate: Bool = true, completion: @escaping (Int, String?) -> Void)
```

**参数**

* *image* 人脸照片

**示例**

```swift
AuthClient().uploadFaceImage(image) { code, key in
    // key 人脸识别参数
}
```

<br>

## 绑定人脸

首次人脸验证绑定人脸。调用此接口之前，需要先调用 [上传人脸照片](#上传人脸照片) 接口以获取照片 `key` 值

```swift
func mfaAssociateByFace(photoKeyA: String, photoKeyB: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *photoKeyA* 首张照片的 Key
* *photoKeyB* 第二张照片的 Key

**示例**

```swift
AuthClient().mfaAssociateByFace(photoKeyA: "photoKeyA", photoKeyB: "photoKeyB") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>

## 人脸验证

通过人脸识别进行多因素认证。调用此接口之前，需要先调用 [上传人脸照片](#上传人脸照片) 接口以获取照片 `key` 值

```swift
func mfaVerifyByFace(photoKey: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *photoKey* 照片的 Key

**示例**

```swift
AuthClient().mfaVerifyByFace(photoKey: "photoKey") { code, message, userInfo in
    // userInfo 用户信息
}
```

<br>
