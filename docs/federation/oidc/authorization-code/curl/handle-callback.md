
<ApiMethodSpec method="post" host="https://<你的应用域名>.authing.cn" path="/oidc/token" summary="client_secret_post 方式换取 token" description="如果你在控制台配置 OIDC 时，换取 token 身份验证方式设置的为 client_secret_post，那么按照下面这种方法换取 token。">
<template slot="headers">
<ApiMethodParam name="Content-Type" type="string" required description="application/x-www-form-urlencoded" />
</template>
<template slot="formDataParams">
<ApiMethodParam name="client_id" type="string" required description="应用 ID" />
<ApiMethodParam name="client_secret" type="string" required description="应用 Secret" />
<ApiMethodParam name="grant_type" type="string" required description="authorization_code" />
<ApiMethodParam name="redirect_uri" type="string" required>

**发起 OIDC 授权登录时**的 redirect_uri 值，必须与发起登录请求时的参数一致

</ApiMethodParam>
<ApiMethodParam name="code" type="string" required description="获取到的授权码，一个 code 仅限一次性使用，用后作废，有效期 10 分钟" />
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4R01uczd5cmNFckxiakNRVW9US1MiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1Mzc4NjksImV4cCI6MTU1NDU0MTQ2OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.wX05OAgYuXeYM7zCxhrkvTO_taqxrCTG_L2ImDmQjMml6E3GXjYA9EFK0NfWquUI2mdSMAqohX-ndffN0fa5cChdcMJEm3XS9tt6-_zzhoOojK-q9MHF7huZg4O1587xhSofxs-KS7BeYxEHKn_10tAkjEIo9QtYUE7zD7JXwGUsvfMMjOqEVW6KuY3ZOmIq_ncKlB4jvbdrduxy1pbky_kvzHWlE9El_N5qveQXyuvNZVMSIEpw8_y5iSxPxKfrVwGY7hBaF40Oph-d2PO7AzKvxEVMamzLvMGBMaRAP_WttBPAUSqTU5uMXwMafryhGdIcQVsDPcGNgMX6E1jzLA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6Ik5kbW9iZVBZOEFFaWQ2T216MzIyOXciLCJzaWQiOiI1ODM2NzllNC1lYWM5LTRjNDEtOGQxMS1jZWFkMmE5OWQzZWIiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ1NDE0NjksImlhdCI6MTU1NDUzNzg2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.IQi5FRHO756e_eAmdAs3OnFMU7QuP-XtrbwCZC1gJntevYJTltEg1CLkG7eVhdi_g5MJV1c0pNZ_xHmwS0R-E4lAXcc1QveYKptnMroKpBWs5mXwoOiqbrjKEmLMaPgRzCOdLiSdoZuQNw_z-gVhFiMNxI055TyFJdXTNtExt1O3KmwqanPNUi6XyW43bUl29v_kAvKgiOB28f3I0fB4EsiZjxp1uxHQBaDeBMSPaRVWQJcIjAJ9JLgkaDt1j7HZ2a1daWZ4HPzifDuDfi6_Ob1ZL40tWEC7xdxHlCEWJ4pUIsDjvScdQsez9aV_xMwumw3X4tgUIxFOCNVEvr73Fg",
  "refresh_token": "WPsGJbvpBjqXz6IJIr1UHKyrdVF",
  "scope": "openid profile offline_access phone email",
  "token_type": "Bearer"
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

使用 curl 发送请求示例：

```
curl --location --request POST 'https://<你的应用域名>.authing.cn/oidc/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=61yhuOVrgyhKlFTU~bnEKA_fnnz' \
--data-urlencode 'client_id=5e37979f7b757ead14c534af' \
--data-urlencode 'client_secret=64b517f8de3648091654eb4ee9b479d3' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'redirect_uri=https://baidu.com'
```

返回示例：

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJqdGkiOiJQZU41YXg1b3FabGRhcUJUMzQzeUkiLCJzdWIiOiI1Y2U1M2FlYTlmODUyNTdkZDEzMmQ3NDkiLCJpc3MiOiJodHRwczovL29hdXRoLmF1dGhpbmcuY24vb2F1dGgvb2lkYyIsImlhdCI6MTU4MTQyMDk1NywiZXhwIjoxNTgxNDI0NTU0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGF1dGhpbmdfdG9rZW4gZW1haWwgcGhvbmUgYWRkcmVzcyBvZmZsaW5lX2FjY2VzcyIsImF1ZCI6IjVkMDFlMzg5OTg1ZjgxYzZjMWRkMzFkZSJ9.rtpRSL3_U03zXShZUCILquSR_KEDuS-OldWpy8RLztWUNG_tMyrg2g9CG4hC7pJUwmgzZKtp7vsVrj6W0eyo_ehE4KGz9iKnyd46DFbx9W9pi-mieRW5HuVMGL2zvDH8zF467WXET2SVB3LUhFLNmEbxpvjPZ5Ksvbcd7nqHfnUN4-z3SqAvhGWWfcmt7QDFlLtWPw4LzyznEqmM9sDkNiNDnTkjmcjm7yHJR-yv5FvpzQB2kraQVOrrdAixbHf29ihOVO25CrjmgeKemg1vuLNGUcOrr_XWn7xaCSvyAfXrBuRalecW9RA4p_Cp6YslHc_572awekt3kUO2TebUQA",
  "expires_in": 3597,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJzdWIiOiI1Y2U1M2FlYTlmODUyNTdkZDEzMmQ3NDkiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6IiIsImdpdmVuX25hbWUiOiIiLCJsb2NhbGUiOiIiLCJtaWRkbGVfbmFtZSI6IiIsIm5hbWUiOiIiLCJuaWNrbmFtZSI6IiIsInBpY3R1cmUiOiJodHRwczovL3VzZXJjb250ZW50cy5hdXRoaW5nLmNuL2F1dGhpbmctYXZhdGFyLnBuZyIsInByZWZlcnJlZF91c2VybmFtZSI6IiIsInByb2ZpbGUiOiIiLCJ1cGRhdGVkX2F0IjoiIiwid2Vic2l0ZSI6IiIsInpvbmVpbmZvIjoiIiwiY29tcGFueSI6IiIsImJyb3dzZXIiOiIiLCJsb2dpbnNfY291bnQiOjEwMywicmVnaXN0ZXJfbWV0aG9kIjoiZGVmYXVsdDp1c2VybmFtZS1wYXNzd29yZCIsImJsb2NrZWQiOmZhbHNlLCJsYXN0X2lwIjoiMTIxLjIxLjU2LjE3MSIsInJlZ2lzdGVyX2luX3VzZXJwb29sIjoiNWM5NTkwNTU3OGZjZTUwMDAxNjZmODUzIiwibGFzdF9sb2dpbiI6IjIwMjAtMDItMTFUMTE6MzU6MTUuNjk2WiIsInNpZ25lZF91cCI6IjIwMTktMDUtMjJUMTI6MDQ6NTguMjk0WiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmtZWFJoSWpwN0ltVnRZV2xzSWpvaWRHVnpkRE5BTVRJekxtTnZiU0lzSW1sa0lqb2lOV05sTlROaFpXRTVaamcxTWpVM1pHUXhNekprTnpRNUlpd2lZMnhwWlc1MFNXUWlPaUkxWXprMU9UQTFOVGM0Wm1ObE5UQXdNREUyTm1ZNE5UTWlmU3dpYVdGMElqb3hOVGd4TkRJd09URTFMQ0psZUhBaU9qRTFPREkzTVRZNU1URjkuM0l0X0NJQTNFbUpoYWcyMW92WjNwd0RfY0owcTVTZkJjSURSZThRX3FoayIsImVtYWlsIjoidGVzdDNAMTIzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjoiMTMxMTIzNDEyMzQiLCJhZGRyZXNzIjoiIiwiYXRfaGFzaCI6IjV6QnNUOHF4RHc1RmNYdU55UFg4YUEiLCJzaWQiOiJkNmZiOTE5Ny00NmE3LTQ1ZGEtOGVkMC05ODhjZjg0ZjQwZWUiLCJhdWQiOiI1ZDAxZTM4OTk4NWY4MWM2YzFkZDMxZGUiLCJleHAiOjE1ODE0MjQ1NTQsImlhdCI6MTU4MTQyMDk1NywiaXNzIjoiaHR0cHM6Ly9vYXV0aC5hdXRoaW5nLmNuL29hdXRoL29pZGMifQ.VZzqULytIteyBfouww5TsHQ50gEhM06kUWMeDiO3FVFSCW9ys2bFPos5p6LFzliK4Ce09ypOwVQiRnE2gNYsukLvlUPlKDIP_Xk5W19frKi1Z8ImuIPvUqVMKbFutVNS0TfIPCPJVBl8C1j5OXeIs6z0V90QrvyJao6FqVEa3axOHxbhpo1fH2hP04-wkGOp_l10d7RFhGcnPyPnz9-C5X6A4UEsCSDCVw1mDQHxDSFP9OPaB_OlCG_Bi6G-CeLhPa3V5hyIefdBvxC9SIpK-6qY-_BfsNKkBHDVKMb0xodgN2hzn3UTUGBuuoiaB4JhCv72EZ7eiXKIXFz6zVcogA",
  "refresh_token": "DuSPlrUFPAvCZ1WQKarv5MbEsXN",
  "scope": "openid profile authing_token email phone address offline_access",
  "token_type": "Bearer"
}
```

**id_token** 中会**包含 scope 参数请求的信息**，例如邮箱、手机号，解析后的 id_token：

```json
{
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://usercontents.authing.cn/authing-avatar.png",
  "preferred_username": "test1",
  "profile": null,
  "updated_at": "2020-09-27T06:06:29.853Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@123.com",
  "email_verified": false,
  "phone_number": null,
  "phone_number_verified": false,
  "nonce": "EhoXn8m7vy",
  "at_hash": "QVtna22pWzdkeSBW3f91pg",
  "aud": "5f17a529f64fb009b794a2ff",
  "exp": 1601468174,
  "iat": 1601464574,
  "iss": "http://console.xxx.localhost:3000/oidc"
}
```
