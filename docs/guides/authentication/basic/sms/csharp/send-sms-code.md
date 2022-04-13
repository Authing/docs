!!!include(common/init-csharp-auth-sdk.md)!!!

使用 `SendSmsCode` 方法：

```csharp
var phone = "phone number";
await authenticationClient.SendSmsCode(phone);
```