---
tags:
  - Access_Token
  - Opaque_Access_Token
  - JWT_Access_Token
  - AccessToken
  - OpaqueAccessToken
  - JwtAccessToken
---
# 什么是 Access Token?

<LastUpdated/>

Access Token 用于基于 Token 的认证模式，允许应用访问一个资源 API。用户认证授权成功后，Authing 会签发 Access Token 给应用。应用需要**携带 Access Token** 访问资源 API，资源服务 API 会通过拦截器查验 Access Token 中的 `scope` 字段是否包含特定的权限项目，从而决定是否返回资源。

如果你的用户通过社交账号登录，例如微信登录，微信作为身份提供商会颁发自己的 Access Token，你的应用可以利用 Access Token 调用微信相关的 API。这些 Access Token 是由社交账号服务方控制的，格式也是任意的。

## Opaque Access Token

Opaque Access Token 是一串**随机字符串**，从中不能获取到任何信息，你需要将它发送到服务器进行解析。只能通过将 Token 发到服务器的方式来验证 Opaque Access Token。

## JWT Access Token

JWT 全称为 [JSON Web Token](https://tools.ietf.org/html/rfc7519)，遵循 JWT 标准。JWT 中包含了**主体、受众、权限、颁发时间、过期时间、用户信息字段**等内容且具备**签名**，**不可篡改**。因此无需发送到服务器，可以本地验证。Authing 在大多数情况下使用此种格式的 Token。

## Access Token 示例

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjF6aXlIVG15M184MDRDOU1jUENHVERmYWJCNThBNENlZG9Wa3VweXdVeU0ifQ.eyJqdGkiOiIzWUJ5eWZ2TDB4b01QNXdwTXVsZ0wiLCJzdWIiOiI2MDE5NDI5NjgwMWRjN2JjMmExYjI3MzUiLCJpYXQiOjE2MTI0NDQ4NzEsImV4cCI6MTYxMzY1NDQ3MSwic2NvcGUiOiJvcGVuaWQgZW1haWwgbWVzc2FnZSIsImlzcyI6Imh0dHBzOi8vc3RlYW0tdGFsay5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDE5M2M2MTBmOTExN2U3Y2IwNDkxNTkifQ.cYyZ6buwAjp7DzrYQEhvz5rvUBhkv_s8xzuv2JHgzYx0jbqqsWrA_-gufLTFGmNkZkZwPnF6ktjvPHFT-1iJfWGRruOOMV9QKPhk0S5L2eedtbKJU6XIEkl3F9KbOFwYM53v3E7_VC8RBj5IKqEY0qd4mW36C9VbS695wZlvMYnmXhIopYsd5c83i39fLBF8vEBZE1Rq6tqTQTbHAasR2eUz1LnOqxNp2NNkV2dzlcNIksSDbEGjTNkWceeTWBRtFMi_o9EWaHExdm5574jQ-ei5zE4L7x-zfp9iAe8neuAgTsqXOa6RJswhyn53cW4DwWg_g26lHJZXQvv_RHZRlQ
```

解析后的内容：

```json
{
  "jti": "3YByyfvL0xoMP5wpMulgL",
  "sub": "60194296801dc7bc2a1b2735", // subject 的缩写，为用户 ID
  "iat": 1612444871,
  "exp": 1613654471,
  "scope": "openid email message",
  "iss": "https://steam-talk.authing.cn/oidc",
  "aud": "60193c610f9117e7cb049159"
}
```
