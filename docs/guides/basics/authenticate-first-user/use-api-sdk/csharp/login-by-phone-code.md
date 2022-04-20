使用 `LoginByPhoneCode` 方法进行手机号验证码登录：

```csharp
var phone = "phone number";
var code = "1234";
var user = await authenticationClient.LoginByPhoneCode(phone, code);
Console.WriteLine(user.Phone);
```