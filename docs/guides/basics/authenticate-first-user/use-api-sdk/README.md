# 使用 API & SDK 完成认证

<LastUpdated/>

在前面的指引中你已经了解了如何使用 [{{$localeConfig.brandName}} 托管的登录页](../use-hosted-login-page.md)和[内嵌登录组件](../use-embeded-login-component/README.md)实现登录注册流程，不仅如此，我们还提供 RESTful、 GraphQL 两种形式的 HTTP API，以及十余种不同语言和框架的 SDK。你可以基于这些 API & SDK 资源，灵活得组合出你需要的认证流程。

## 选择熟悉的 SDK

!!!include(common/sdk-list.md)!!!

## 初始化 SDK

<StackSelector snippet="init-sdk" selectLabel="选择语言" :order="['java', 'javascript', 'swift', 'python', 'csharp']"/>

## 使用 SDK 认证用户

以手机号验证码登录（如果用户账号不存在的话，会先创建一个账号）为例：

首先发送短信验证码

<StackSelector snippet="send-sms-code" selectLabel="选择语言" :order="['java', 'javascript', 'swift', 'python', 'csharp']"/>

然后使用手机号验证码登录：

<StackSelector snippet="login-by-phone-code" selectLabel="选择语言" :order="['java', 'javascript', 'swift', 'python', 'csharp']"/>

成功登录之后，你可以获取到该用户的用户信息，其中 token 为该用户的身份凭证，后续访问你后端资源的时候应该带上，然后在后端验证此 token 的身份。

## 验证用户 Token

用户信息的 `token` 字段为标准的 OIDC IdToken，你可以在后端使用[应用的 ID 和 Secret](/guides/faqs/get-app-id-and-secret.md) 验证此 `token`。

示例的 `token` 如下：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6IiIsImdpdmVuX25hbWUiOiIiLCJsb2NhbGUiOiIiLCJtaWRkbGVfbmFtZSI6IiIsIm5hbWUiOiIiLCJuaWNrbmFtZSI6IiIsInBpY3R1cmUiOiJodHRwczovL3VzZXJjb250ZW50cy5hdXRoaW5nLmNuL2F1dGhpbmctYXZhdGFyLnBuZyIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3RAZXhhbXBsZS5jb20iLCJwcm9maWxlIjoiIiwidXBkYXRlZF9hdCI6IjIwMjEtMDEtMThUMDc6NDg6NTUuNzgxWiIsIndlYnNpdGUiOiIiLCJ6b25laW5mbyI6IiIsImFkZHJlc3MiOnsiY291bnRyeSI6IiIsInBvc3RhbF9jb2RlIjoiIiwicmVnaW9uIjoiIiwiZm9ybWF0dGVkIjoiIn0sInBob25lX251bWJlciI6bnVsbCwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJkYXRhIjp7InR5cGUiOiJ1c2VyIiwidXNlclBvb2xJZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyIsImFwcElkIjoiNjAwNTNiNzQxNjQ3OGRlMmU4OGZhYjQzIiwiaWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJ1c2VySWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJfaWQiOiI1ZjIxNTFiZWFlNWE4YjRjZTZiMGJhZTkiLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyJ9LCJ1c2VycG9vbF9pZCI6IjVhOWZhMjZjZjg2MzVhMDAwMTg1NTI4YyIsImF1ZCI6IjYwMDUzYjc0MTY0NzhkZTJlODhmYWI0MyIsImV4cCI6MTYxMjE2NTg4OCwiaWF0IjoxNjEwOTU2Mjg4LCJpc3MiOiJodHRwczovL3NhbXBsZS1hcHAuYXV0aGluZy5jbi9vaWRjIn0.SNyGBffF-zBqDQFINGxUJZrWSAADHQhbEOsKvnH4SLg
```

你可以在[该网站](https://jwt.io/)（国内用户可以访问此[镜像站](https://jwt.yelexin.cn)）中解码此 IdToken ：

![](../images/jwt.io.png)

基本上所有语言都提供了检验 IdToken 的 Library，你可以选择自己熟悉的语言：

<StackSelector snippet="verify-id-token" selectLabel="选择语言" :order="['java', 'javascript', 'swift', 'python', 'csharp']"/>

如果验证成功，你可以获取到该 `id_token` 的用户信息，其中 `sub` 字段为用户的 ID，`aud` 字段为应用的 ID，你可以[点此](/concepts/id-token.md)了解 IdToken 每个字段的详细释义。

## 接下来

识别用户身份之后，你可能还需要[对该用户进行权限管理](/guides/access-control/)，以判断用户是否对此 API 具备操作权限。
