!!!include(en/common/init-csharp-auth-sdk.md)!!!

Use `LoginByEmail` 方法：

```csharp
var email = "test@example.com";
var password = "123456";
var user = await authenticationClient.LoginByEmail(email, password);
Console.WriteLine(user.Email);
```
