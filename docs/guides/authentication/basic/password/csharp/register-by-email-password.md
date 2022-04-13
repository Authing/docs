!!!include(common/init-csharp-auth-sdk.md)!!!

使用 `RegisterByEmail` 方法：

```csharp
var email = "test@example.com";
var password = "123456";
var user = await authenticationClient.RegisterByEmail(email, password);
Console.WriteLine(user.Email);
```
