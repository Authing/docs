!!!include(en/common/init-csharp-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后 Use `RegisterByPhoneCode` 方法：

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var user = await authenticationClient.RegisterByPhoneCode(phone, code, password);
Console.WriteLine(user.Phone);
```
