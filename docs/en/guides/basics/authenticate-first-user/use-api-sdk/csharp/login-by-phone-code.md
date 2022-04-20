Use `loginByPhoneCode` method to login.

```csharp
var phone = "phone number";
var code = "1234";
var user = await authenticationClient.LoginByPhoneCode(phone, code);
Console.WriteLine(user.Phone);
```