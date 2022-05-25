!!!include(common/init-java-mngmt-sdk.md)!!!

使用 [UsersManagementClient](/reference-new/standard-web-application/sdk-for-java/management/UsersManagementClient.md) 的 `create` 方法创建用户：

```java
String email = "test@example.com";
String password = "123456";
User user = managementClient.users().create(new CreateUserInput().withEmail(email).withPassword(password)).execute();
```