Use `loginByPhoneCode` method to login.

```javascript
authenticationClient.loginByPhoneCode("188xxxx8888", "1234");

// 国外号码
authenticationClient.loginByPhoneCode("788xxxx637", "1234", { phoneCountryCode: '+44' });
```