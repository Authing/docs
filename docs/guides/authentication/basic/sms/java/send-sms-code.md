!!!include(common/init-java-auth-sdk.md)!!!

使用 `sendSmsCode` 方法：

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```