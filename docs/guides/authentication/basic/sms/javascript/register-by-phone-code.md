!!!include(common/init-js-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后使用 `registerByPhoneCode` 方法：


```javascript
authenticationClient.registerByPhoneCode("176xxxx6754", "1234");

// 国外号码
authenticationClient.registerByPhoneCode(
  '788xxxx637',
  '1234',
  null,
  null,
  {
    phoneCountryCode: '+44'
  }
);
```

或者：

```javascript
authenticationClient.registerByPhoneCode(
  "176xxxx6754",
  "1234",
  "passw0rd",
  {
    nickname: "Nick",
  },
  {
    generateToken: true,
  }
);
```
