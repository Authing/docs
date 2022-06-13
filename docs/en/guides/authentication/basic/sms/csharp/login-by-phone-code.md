!!!include(en/common/init-csharp-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后 Use `LoginByPhoneCode` 方法：

```csharp
var phone = "phone number";
var code = "1234";
var user = await authenticationClient.LoginByPhoneCode(phone, code);
Console.WriteLine(user.Phone);
```
