# APP Full Interface List For APP QR Code Login

{{$localeConfig.brandName}} provides a REST-based QR code login interface, which developers can call directly.

## Generate QR code

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/gene" description="The interface will return the QR code ID (random) and the QR code link.">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="User pool ID" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="customeData" type="string" description="The custom data field will be written into the original data of the QR code.  " />
<ApiMethodParam name="scene" type="string" required description="Scene value. A constant, fill in APP_AUTH." />
</template>
<template slot="response">
<ApiMethodResponse>
<template slot="description">

Field definition:

-- random: The only sign of the QR code, which will be used to query the status of the QR code and the user confirmation authorization interface.
- url: QR code image address.
- expiresIn: The valid time of the QR code.

</template>

```json
{
  "code": 200,
  "data": {
    "random": "SzZrszCJNCFfVBDUCKLDtAYNBR96SK",
    "expiresIn": 120,
    "url": "https://files.authing.co/user-contentsqrcode/5fae2648201cfd526f0ec354/SzZrszCJNCFfVBDUCKLDtAYNBR96SK.png"
  }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

Example of generated QR code:

![](https://files.authing.co/user-contentsqrcode/5fae2648201cfd526f0ec354/SzZrszCJNCFfVBDUCKLDtAYNBR96SK.png)

Use the [online QR code decoding tool](https://cli.im/deqr) to view the QR code data as follows:

```json
{
  "scene": "APP_AUTH",
  "random": "SzZrszCJNCFfVBDUCKLDtAYNBR96SK",
  "userPoolId": "5fae2648201cfd526f0ec354",
  "createdAt": "2020-11-13T06:23:25.396Z",
  "expiresIn": 120,
  "customData": {}
}
```

## Query the status of the QR code

<ApiMethodSpec method="get" host="https://core.authing.cn" path="/api/v2/qrcode/check">
<template slot="queryParams">
<ApiMethodParam name="random" type="string" required description="QR code ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "Query the QR code status successfully！",
  "data": {
    "random": "SzZrszCJNCFfVBDUCKLDtAYNBR96SK",
    "userInfo": {},
    "status": 0,
    "ticket": null,
    "scannedUserId": null
  }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

Request result field description:

- status
  - 0: The code is not scanned.
  - 1: The QR code has been scanned but the user has not clicked to agree to authorize or cancel authorization. At this time, the user's avatar and nickname will be returned, but it does not contain other confidential information, which can be used for front-end avatar display.
  - 2: User agrees to authorization
  - 3: User cancels authorization
  - -1: Expired
- userInfo:
  - By default, after the user scans the code, it will contain two fields: nickname and photo
  - Developers can also configure to return complete user information (including login credentials token)
- ticket: used in getting complete user information. **This field will only appear after the user agrees to the authorization. **See below for details.

## To get user information by ticket

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/userinfo">
<template slot="bodyParams">
<ApiMethodParam name="ticket" type="string" required description="Query the ticket returned by the QR code status interface" />
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "换取用户信息成功",
  "data": {
    "id": "5e05bbf2d51b3761d5c71070",
    "email": "983132@qq.com",
    "emailVerified": false,
    "oauth": "",
    "username": "983132@qq.com",
    "nickname": "",
    "company": "",
    "photo": "https://usercontents.authing.co/authing-avatar.png",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiOTgzMTMyQHFxLmNvbSIsImlxxxxxxxxx",
    "phone": "",
    "tokenExpiredAt": "2020-01-11T08:08:18.000Z",
    "loginsCount": 1,
    "lastIp": "::1",
    "signedUp": "2019-12-27T08:08:18.115Z",
    "blocked": false,
    "isDeleted": false
  }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
Attention: By default, **this interface is only allowed to be called on the server side**,which needs to be initialized with the user pool key.

The default validity time of the ticket is 300 s.

Developers can modify in the [{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool) **basic configuration** -&gt; **basic settings** -&gt; **app QR code scanning** login Web custom configuration. **See the [custom configuration item](./customize-settings.md) page for details**.
:::

## Mark the code scanned on APP

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/scanned" description="APP 端标记已扫码，标记扫码之后 Web 端将可以获取到当前用户的昵称和头像。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="User pool ID" />
<ApiMethodParam name="Authorization" type="string" required description="User login credentials" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="QR code ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "QR code scanning confirmed successfully",
    data: {
        random: "", // Return as it was before
        status: 0,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
The APP needs to meet two conditions:

1. User must be logged in
2. The user's user pool ID matches the QR code user pool ID.

:::

## Agrees to authorization on APP

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/confirm" description="The APP agrees to the authorization, and the scanned interface needs to be called before calling this interface.">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="User pool ID" />
<ApiMethodParam name="Authorization" type="string" required description="User login credentials" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="QR code ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "Authorized login succeeded",
    data: {
        random: "", // Return as it was before
        status: 1,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
The APP needs to meet two conditions:

1. User must be logged in
2. The user's user pool ID matches the QR code user pool ID.
   :::

## Cancel authorization on APP

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/cancel" description="To cancel authorization on the APP, you need to call the scanned interface before calling this interface.">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="User pool ID" />
<ApiMethodParam name="Authorization" type="string" required description="User login credentials" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="QR code ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "Cancel authorization successfully",
    data: {
        random: "", // Return as it was before
        status: -1,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
The APP needs to meet two conditions:

1. User must be logged in
2. The user's user pool ID matches the QR code user pool ID.

:::
