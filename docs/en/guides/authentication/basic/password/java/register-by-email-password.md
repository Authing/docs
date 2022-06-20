!!!include(en/common/init-java-auth-sdk.md)!!!

Use `registerByEmail` 方法：

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
```
