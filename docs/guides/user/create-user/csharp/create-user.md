!!!include(common/init-csharp-mngmt-sdk.md)!!!

使用 [UsersManagementClient](/reference-new/standard-web-application/sdk-for-csharp/management/UsersManagementClient.md) 的 `create` 方法创建用户：

```csharp
var email = "test@example.com";
var password = "123456";
var user = managementClient.Users.Create(new CreateUserInput()
{
  Email = email,
  Password = password,
})
```