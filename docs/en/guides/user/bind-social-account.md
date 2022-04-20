# Bind account

<LastUpdated/>

You may face this scenario: your user registered an account with a phone number, and then registered an account with another social account. Now you want to bind the social account to the phone number account. Later, when the user uses the social account to log in, he/she will log in to the phone account and return the information of the phone account.

You can bind the user's social account to his main account (phone number, email account) by calling the following interface:

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/users/link" summary="将社交账号绑定到主账号">
<template slot="description">

If you want to bind a social account to a main account, the end user must provide the credentials of the **social account** and the **main account** to prove that he is the owner of the two accounts, and then perform binding.

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
When the social account is bound, the data corresponding to the original social account will be deleted, and it is not allowed to log in to the original social account again.
:::
