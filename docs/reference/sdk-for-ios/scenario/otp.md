# Authing OTP

<LastUpdated/>

Authing OTP 组件用于生成多因素身份验证的一次性密码 （OTP），开发者也可以通过此组件快速实现 OTP 的增删改查。

也可以[下载 iOS APP](https://apps.apple.com/cn/app/authing-%E4%BB%A4%E7%89%8C/id1603744061) 体验 Authing 官方应用。

<img src="./image/otp.png" alt="drawing" width="300"/>

## 集成 Authing OTP

### 第一步：添加 AuthingOTP 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **AuthingOTP** 。

<br>

## 如何使用

### 创建 OTP 对象
```swift
let totp = TOTP(secret: data)
```
可以使用如上所示的默认设置（6 位数字、30 秒时间间隔和使用 HMAC-SHA-1）创建 TOTP 对象，或者可以如下所示设置各个参数：

```swift
let totp = TOTP(secret: data, digits: 6, timeInterval: 30, algorithm: .sha1)
```

### 生成 OTP 密码
创建 TOTP 对象后，可以为某个时间点生成密码，使用 Date 对象或使用 generate() 函数的 Unix 时间值

例如，要使用名为 totp 的 TOTP 对象获取当前时间的密码：
```swift
if let totp = TOTP(secret: data) {
    let otpString = totp.generate(time: Date)
}
```

或者 Unix 时间（从 1970 年 1 月 1 日 00:00 UTC 开始）：
```swift
if let totp = TOTP(secret: data) {
    let otpString = totp.generate(secondsPast1970: 1234567890)
}
```

### 查询本地 OTP 列表

```swift
OTPDataManager.shared.queryOTPList {totps, error in
    // totps
}
```

### 新增 OTP 数据

```swift
OTPDataManager.shared.insertOTPItem(totp: otp)
```

### 修改 OTP 数据

```swift
OTPDataManager.shared.updateOTPItem(totp: otp)
```

### 删除 OTP 数据

```swift
OTPDataManager.shared.deleteOTPItem(totp: otp)
```

### Base32
大多数用于生成一次性密码的密钥都使用 Base32 编码。 

例如：
```swift
base32DecodeToData("ABCDEFGHIJKLMNOP")
```
或者：
```swift
guard let data = base32DecodeToData("ABCDEFGHIJKLMNOP") else { return }

if let hotp = HOTP(secret: data) {
    print(hotp.generate(42))
}
```