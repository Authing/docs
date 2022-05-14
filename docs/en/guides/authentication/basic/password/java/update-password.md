!!!include(en/common/init-java-auth-sdk.md)!!!

如果用户之前没有设置过密码（比如由手机号、社会化登录等方式注册），不需要传入原始密码。

```java
String newPassword = "123456";
User user = authenticationClient.updatePassword(newPassword).execute();
```

或者：

```java
String oldPassword = "111111";
String newPassword = "123456";
User user = authenticationClient.updatePassword(newPassword, oldPassword).execute();
```
