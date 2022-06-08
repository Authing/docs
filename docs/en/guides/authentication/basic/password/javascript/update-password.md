!!!include(en/common/init-js-auth-sdk.md)!!!

如果用户之前没有设置过密码（比如由手机号、社会化登录等方式注册），不需要传入原始密码。

```javascript
authenticationClient.updatePassword("passw0rd");
```

或者：

```javascript
authenticationClient.updatePassword("passw0rd", "oldPassw0rd"); // 用户之前设置了密码
```
