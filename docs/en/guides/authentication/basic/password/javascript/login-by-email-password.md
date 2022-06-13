!!!include(en/common/init-js-auth-sdk.md)!!!

Use `loginByEmail` 方法：

```javascript
authenticationClient.loginByEmail("test@example.com", "passw0rd");
```

或者：

```javascript
authenticationClient.loginByEmail(
 'test@example.com',
 'passw0rd',
 {
   autoRegister: true，
   captchaCode: 'xj72'
 }
)
```
