使用 `SendSmsCode` 方法发送验证码：

```csharp
var phone = "phone number";
await authenticationClient.SendSmsCode(phone);
```