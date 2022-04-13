# What is Access Token

<LastUpdated/>

**Access Token** allows applications to use resource API. Authing provide **Access Token** to application after user successfully consent. When requesting resources from API. API will check `scope` in **Access Token** to verify if the request is valid. 
If user login through Social Media Account. For example: WeChat, as an Identity Provider, provides its Access Token. Your application could request API from WeChat by using Access Token. These Token are customized by Social Media Provider and token format could vary.

## Opaque Access Token

Opaque access tokens are tokens in a proprietary format that you cannot directly read or decrypt. The recipient of the opaque  token needs to call the server that issued the token to validate.

## JWT Access Token

JSON Web Token [JWT](https://tools.ietf.org/html/rfc7519) access tokens conform to the JWT standard and contain information about an entity in the form of claims. JWT Token is not necessary for the recipient to call a server to validate the token.

## Access Token Example

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjF6aXlIVG15M184MDRDOU1jUENHVERmYWJCNThBNENlZG9Wa3VweXdVeU0ifQ.eyJqdGkiOiIzWUJ5eWZ2TDB4b01QNXdwTXVsZ0wiLCJzdWIiOiI2MDE5NDI5NjgwMWRjN2JjMmExYjI3MzUiLCJpYXQiOjE2MTI0NDQ4NzEsImV4cCI6MTYxMzY1NDQ3MSwic2NvcGUiOiJvcGVuaWQgZW1haWwgbWVzc2FnZSIsImlzcyI6Imh0dHBzOi8vc3RlYW0tdGFsay5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDE5M2M2MTBmOTExN2U3Y2IwNDkxNTkifQ.cYyZ6buwAjp7DzrYQEhvz5rvUBhkv_s8xzuv2JHgzYx0jbqqsWrA_-gufLTFGmNkZkZwPnF6ktjvPHFT-1iJfWGRruOOMV9QKPhk0S5L2eedtbKJU6XIEkl3F9KbOFwYM53v3E7_VC8RBj5IKqEY0qd4mW36C9VbS695wZlvMYnmXhIopYsd5c83i39fLBF8vEBZE1Rq6tqTQTbHAasR2eUz1LnOqxNp2NNkV2dzlcNIksSDbEGjTNkWceeTWBRtFMi_o9EWaHExdm5574jQ-ei5zE4L7x-zfp9iAe8neuAgTsqXOa6RJswhyn53cW4DwWg_g26lHJZXQvv_RHZRlQ
```

After Decode:

```json
{
  "jti": "3YByyfvL0xoMP5wpMulgL",
  "sub": "60194296801dc7bc2a1b2735",
  "iat": 1612444871,
  "exp": 1613654471,
  "scope": "openid email message",
  "iss": "https://steam-talk.authing.cn/oidc",
  "aud": "60193c610f9117e7cb049159"
}
```
