!!!include(en/common/init-js-auth-sdk.md)!!!

Use 手机号验证码重置密码：

```javascript
authenticationClient.resetPasswordByPhoneCode(
  "188xxxx8888",
  "1234",
  "passw0rd"
);
```

Use 邮箱验证码重置密码：

```javascript
authenticationClient.resetPasswordByEmailCode(
  "test@example.com",
  "1234",
  "passw0rd"
);
```
