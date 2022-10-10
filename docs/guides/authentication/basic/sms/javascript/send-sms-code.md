!!!include(common/init-js-auth-sdk.md)!!!

使用 `sendSmsCode` 方法：

```javascript
authenticationClient.sendSmsCode("188xxxx8888");

// 发国际短信
authenticationClient.sendSmsCode("788xxxx637", "+44");
```
