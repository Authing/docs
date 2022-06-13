!!!include(en/common/init-java-auth-sdk.md)!!!

Use 手机号验证码重置密码：

```java
String phone = "phone number";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByPhoneCode(phone, code, password).execute();
```

Use 邮箱验证码重置密码：

```java
String email = "test@example.com";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByEmailCode(email, code, password).execute();
```
