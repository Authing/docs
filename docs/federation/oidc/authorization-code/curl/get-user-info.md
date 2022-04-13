
<ApiMethodSpec method="get" host="https://core.authing.cn" path="/oidc/me" summary="使用 access_token 换取用户信息">
<template slot="queryParams">
<ApiMethodParam name="access_token" type="string" required description="access_token" />
</template>
<template slot="response">
<ApiMethodResponse>

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

</ApiMethodResponse>
</template>
</ApiMethodSpec>

curl 请求示例：

```shell
curl --request GET \
  --url 'https://core.authing.cn/oidc/me?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDczYjhlYzFlZGQ2NTVlMDM0ZjdlYjQiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0xMlQwMzozNzoyNi4wNTdaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImFkZHJlc3MiOnsiY291bnRyeSI6bnVsbCwicG9zdGFsX2NvZGUiOm51bGwsInJlZ2lvbiI6bnVsbCwiZm9ybWF0dGVkIjpudWxsfSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6IndhbmdsYW90aWVAZnVsb25nLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImV4dGVybmFsX2lkIjpudWxsLCJ1bmlvbmlkIjpudWxsLCJkYXRhIjp7InR5cGUiOiJ1c2VyIiwidXNlclBvb2xJZCI6IjYwNDg4OTIxMjMzN2M5ZjBhZWI4MjUwOCIsImFwcElkIjoiNjA2ZGFkYzFiZDYxZGZiNTYyZTc4MDQ2IiwiaWQiOiI2MDczYjhlYzFlZGQ2NTVlMDM0ZjdlYjQiLCJ1c2VySWQiOiI2MDczYjhlYzFlZGQ2NTVlMDM0ZjdlYjQiLCJfaWQiOiI2MDczYjhlYzFlZGQ2NTVlMDM0ZjdlYjQiLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJ3YW5nbGFvdGllQGZ1bG9uZy50ZWNoIiwidXNlcm5hbWUiOm51bGwsInVuaW9uaWQiOm51bGwsIm9wZW5pZCI6bnVsbCwiY2xpZW50SWQiOiI2MDQ4ODkyMTIzMzdjOWYwYWViODI1MDgifSwidXNlcnBvb2xfaWQiOiI2MDQ4ODkyMTIzMzdjOWYwYWViODI1MDgiLCJhdWQiOiI2MDZkYWRjMWJkNjFkZmI1NjJlNzgwNDYiLCJleHAiOjE2MTk0MDgyNDYsImlhdCI6MTYxODE5ODY0NiwiaXNzIjoiaHR0cHM6Ly9mdWxvbmctdWFtcy5hdXRoaW5nLmNuL29pZGMifQ.Un3uPEIh1OJaWbujkaFLfsbkLQqLwhHCiCRLbzxoxJ8' \
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
