Use `loginByPhoneCode` method to login.

```javascript
authenticationClient.loginByPhoneCode("176xxxx6754", "1234");

// 国外号码
authenticationClient.loginByPhoneCode("788xxxx637", "1234", { phoneCountryCode: '+44' });
```