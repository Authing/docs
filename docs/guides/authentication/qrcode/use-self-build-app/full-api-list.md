# APP 扫码登录完整接口列表

<LastUpdated/>

{{$localeConfig.brandName}} 提供基于 REST 的扫码登录接口，开发者可以直接调用。

## 生成二维码

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/gene" description="该接口会返回二维码 ID （random） 和二维码链接。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="customeData" type="string" description="自定义数据字段，会写入二维码的原始数据中。" />
<ApiMethodParam name="scene" type="string" required description="场景值。为常量值，填 APP_AUTH。" />
</template>
<template slot="response">
<ApiMethodResponse>
<template slot="description">

字段释义：

- random: 二维码唯一标志，查询二维码状态、用户确认授权接口会用到。
- url: 二维码图片地址。
- expiresIn: 二维码有效时间。

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

生成的二维码示例：

![](https://files.authing.co/user-contentsqrcode/5fae2648201cfd526f0ec354/SzZrszCJNCFfVBDUCKLDtAYNBR96SK.png)

使用[在线二维码解码工具](https://cli.im/deqr) 查看二维码数据如下：

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

## 查询二维码状态

<ApiMethodSpec method="get" host="https://core.authing.cn" path="/api/v2/qrcode/check">
<template slot="queryParams">
<ApiMethodParam name="random" type="string" required description="二维码 ID。" />
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "查询二维码状态成功！",
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

请求结果字段说明：

- status
  - 0: 未扫码。
  - 1: 已经扫码但用户还没有点击同意授权或者取消授权，此时会返回用户的头像和昵称，但不包含其他机密信息，可用于前端头像展示。
  - 2: 用户同意授权
  - 3: 用户取消授权
  - -1: 过期
- userInfo:
  - 默认情况下，在用户扫码之后，会包含昵称（nickname）和头像（photo）两个字段
  - 开发者也可以配置返回完整用户信息（包括登录凭证 token）
- ticket：用于换取完整用户资料。**此字段只有在用户同意授权之后才会出现。**详情见下文。

## 使用 ticket 换取用户信息

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/userinfo">
<template slot="bodyParams">
<ApiMethodParam name="ticket" type="string" required description="查询二维码状态接口返回的 ticket" />
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
注意：默认情况下，此接口**只允许在服务器端调用**，即需要使用用户池密钥初始化之后。

ticket 默认有效时间为 300 s。

开发者可在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) **基础配置** -&gt; **基础设置** -&gt; **App 扫码登录 Web 自定义配置** 处修改。**详情见[自定义配置项页](./customize-settings.md)。**
:::

## APP 端标记已扫码

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/scanned" description="APP 端标记已扫码，标记扫码之后 Web 端将可以获取到当前用户的昵称和头像。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="用户登录凭证。" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="二维码 ID。" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "二维码扫描确认成功",
    data: {
        random: "", // 原样返回
        status: 0,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
APP 端需要满足两个条件：

1. 用户必须处于登录态
2. 用户的用户池 ID 和二维码用户池 ID 匹配。

:::

## APP 端同意授权

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/confirm" description="APP 端同意授权，调用此接口前需要先调用 scanned 接口。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="用户登录凭证。" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="二维码 ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "授权登录成功",
    data: {
        random: "", // 原样返回
        status: 1,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
APP 端需要满足两个条件：

1. 用户必须处于登录态
2. 用户的用户池 ID 和二维码用户池 ID 匹配。
   :::

## APP 端取消授权

<ApiMethodSpec method="post" host="https://core.authing.cn" path="/api/v2/qrcode/cancel" description="APP 端取消授权，调用此接口前需要先调用 scanned 接口。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="用户登录凭证。" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="random" type="string" required description="二维码 ID" />
</template>
<template slot="response">
<ApiMethodResponse>

```js
{
    code: 200,
    message: "取消授权成功",
    data: {
        random: "", // 原样返回
        status: -1,
        description: "xxxx",
    }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

::: hint-info
APP 端需要满足两个条件：

1. 用户必须处于登录态
2. 用户的用户池 ID 和二维码用户池 ID 匹配。

:::
