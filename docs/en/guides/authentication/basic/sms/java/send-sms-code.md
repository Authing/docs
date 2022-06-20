!!!include(en/common/init-java-auth-sdk.md)!!!

Use `sendSmsCode` 方法：

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```
