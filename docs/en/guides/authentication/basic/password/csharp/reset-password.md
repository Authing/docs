!!!include(en/common/init-csharp-auth-sdk.md)!!!

Use 手机号验证码重置密码：

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var message = await authenticationClient.ResetPasswordByPhoneCode(phone, code, password);
```

Use 邮箱验证码重置密码：

```csharp
var email = "test@example.com";
var code = "1234";
var password = "123456";
var message = await authenticationClient.ResetPasswordByEmailCode(email, code, password);
```
