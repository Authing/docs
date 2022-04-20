
!!!include(common/init-java-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后使用 `loginByPhoneCode` 方法：

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```
