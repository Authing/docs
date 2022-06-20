!!!include(en/common/init-csharp-auth-sdk.md)!!!

Use `RegisterByEmail` 方法：

```csharp
var email = "test@example.com";
var password = "123456";
var user = await authenticationClient.RegisterByEmail(email, password);
Console.WriteLine(user.Email);
```
