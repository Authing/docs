!!!include(en/common/init-java-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后 Use `registerByPhoneCode` 方法：

```java
String phone = "phone number";
String code = "1234";
String pasword = "123456"
User user = authenticationClient.registerByPhoneCode(new RegisterByPhoneCodeInput(phone, code).withPassword(password)).execute();
```
