!!!include(common/init-js-auth-sdk.md)!!!

使用手机号验证码重置密码：

```javascript
authenticationClient.resetPasswordByPhoneCode(
  "188xxxx8888",
  "1234",
  "passw0rd"
);
```

使用邮箱验证码重置密码：

```javascript
authenticationClient.resetPasswordByEmailCode(
  "test@example.com",
  "1234",
  "passw0rd"
);
```
