!!!include(common/init-java-auth-sdk.md)!!!

使用 `loginByEmail` 方法：

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();
```
