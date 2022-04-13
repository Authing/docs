使用 `sendSmsCode` 方法发送验证码：

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```