# 验证用户身份凭证（token）

<LastUpdated/>

当你的用户成功登录后，Authing 会为该用户签发一个 [OIDC IdToken](/concepts/id-token.md) 作为身份凭证。验证方式请查看[验证 Token 文档](/guides/faqs/how-to-validate-user-token.md)。

一个示例解码过后的示例 `OIDC IdToken` 如下：

```javascript
{
  sub: '5f719946524ee1099229496b', // subject 的缩写，为用户 ID
  birthdate: null,
  family_name: null,
  gender: 'U',
  given_name: null,
  locale: null,
  middle_name: null,
  name: null,
  nickname: null,
  picture: 'https://files.authing.co/user-contents/photos/9a9dc4d7-e756-45b1-81d8-095a28e476c6.jpg',
  preferred_username: 'test1',
  profile: null,
  updated_at: '2020-09-30T07:12:19.401Z',
  website: null,
  zoneinfo: null,
  email: 'test1@123.com',
  email_verified: false,
  phone_number: null,
  phone_number_verified: false,
  nonce: 'E65b1QoUYt',
  at_hash: 'B3IgOYDDa0Pz8v1_9qZrAw',
  aud: '5f17a529f64fb009b794a2ff',
  exp: 1601453558,
  iat: 1601449959,
  iss: 'https://oidc1.authing.cn/oidc'
}
```

其中 `sub` 为该 Id Token 的唯一标识，一般为用户 ID。