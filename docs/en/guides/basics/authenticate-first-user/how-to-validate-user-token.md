# Validate User Token

<LastUpdated/>

When a user successfully logs in, Authing will issue an [OIDC IdToken](/concepts/id-token.md) for the user as an identity credential.Please refer to the [Validate Token document](/guides/faqs/how-to-validate-user-token.md) for the validation method.

An example of decoded `OIDC IdToken` is as follows:

```javascript
{
  sub: '5f719946524ee1099229496b',
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

`sub` is the unique identifier of the Id Token, generally used as user ID.
