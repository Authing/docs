!!!include(en/common/init-csharp-auth-sdk.md)!!!

如果用户之前没有设置过密码（比如由手机号、社会化登录等方式注册），不需要传入原始密码。

```csharp
var newPassword = "123456";
await authenticationClient.UpdatePassword(newPassword);
```

或者：

```csharp
var oldPassword = "111111";
var newPassword = "123456";
await authenticationClient.UpdatePassword(newPassword, oldPassword);
```
