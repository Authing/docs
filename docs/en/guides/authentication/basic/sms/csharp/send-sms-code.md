!!!include(en/common/init-csharp-auth-sdk.md)!!!

Use `SendSmsCode` 方法：

```csharp
var phone = "phone number";
await authenticationClient.SendSmsCode(phone);
```
