```js
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getUserInfoByAccessToken('Access token');
```

返回示例：

```json
{
  "sub": "5f7174df27e0eb9c6d21436d", // subject 的缩写，为用户 ID
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://usercontents.authing.cn/authing-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2020-09-28T05:33:15.892Z",
  "website": null,
  "zoneinfo": null
}
```
详情查看[文档](/reference/sdk-for-node/authentication/StandardProtocol.html#token-换用户信息)。