# 绑定账号

<LastUpdated/>

你可能会遇到这样的场景：你的用户使用手机号注册了一个账户，又使用微信注册了一个账户。现在想将微信账户绑定到手机号账户下面，以后用户再使用微信登录时就登入到手机号账户下，返回手机号账户的信息。

你可以通过调用以下接口来实现将用户的的社交账号绑定到他的主账号（手机、邮箱账号）上：

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/users/link" summary="将社交账号绑定到主账号">
<template slot="description">

如果希望绑定一个社交账号到一个主账号，那么终端用户必须提供**社交账号**的凭证和**主账号**的凭证，这样才能证明他是这两个账号的主人，然后进行绑定。

</template>
<template slot="headers">
<ApiMethodParam name="Content-Type" type="string" required description="application/x-www-form-urlencoded" />
</template>
<template slot="formDataParams">
<ApiMethodParam name="primaryUserToken" type="string" required description="主账号 Token" />
<ApiMethodParam name="secondaryUserToken" type="string" required description="社交账号 Token" />
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "绑定成功"
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-warning
当完成社交账号绑定后，原来社交账号对应的数据会被删除，无法再次登录到原来的社交账号。
:::
