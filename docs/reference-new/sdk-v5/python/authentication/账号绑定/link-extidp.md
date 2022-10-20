# 绑定外部身份源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />



由于绝大多数的外部身份源登录不允许在第三方系统直接输入账号密码进行登录，所以外部身份源的绑定总是需要先跳转到对方的登录页面进行认证。此端点会通过浏览器 `302` 跳转的方式先跳转到第三方的登录页面，
终端用户在第三方系统认证完成之后，浏览器再会跳转到 Authing 服务器，Authing 服务器会将此外部身份源绑定到该用户身上。最终的结果会通过浏览器 Window Post Message 的方式传递给开发者。
你可以在你的应用系统中放置一个按钮，引导用户点击之后，弹出一个 Window Popup，地址为此端点，当用户在第三方身份源认证完成之后，此 Popup 会通过 Window Post Message 的方式传递给父窗口。

为此我们在 `@authing/browser` SDK 中封装了相关方法，为开发者省去了其中大量的细节：

```typescript
import { Authing } from "@authing/browser"
const sdk = new Authing({
  // 应用的认证地址，例如：https://domain.authing.cn
  domain: "",

  // Authing 应用 ID
  appId: "you_authing_app_id",

  // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
  redirectUri: "your_redirect_uri"
});


// success 表示此次绑定操作是否成功；
// errMsg 为如果绑定失败，具体的失败原因，如此身份源已被其他账号绑定等。
// identities 为此次绑定操作具体绑定的第三方身份信息
const { success, errMsg, identities } = await sdk.bindExtIdpWithPopup({
  "extIdpConnIdentifier": "my-wechat"
})

```

绑定外部身份源成功之后，你可以得到用户在此第三方身份源的信息，以绑定飞书账号为例：

```json
[
  {
    "identityId": "62f20932xxxxbcc10d966ee5",
    "extIdpId": "62f209327xxxxcc10d966ee5",
    "provider": "lark",
    "type": "open_id",
    "userIdInIdp": "ou_8bae746eac07cd2564654140d2a9ac61",
    "originConnIds": ["62f2093244fa5cb19ff21ed3"]
  },
  {
    "identityId": "62f726239xxxxe3285d21c93",
    "extIdpId": "62f209327xxxxcc10d966ee5",
    "provider": "lark",
    "type": "union_id",
    "userIdInIdp": "on_093ce5023288856aa0abe4099123b18b",
    "originConnIds": ["62f2093244fa5cb19ff21ed3"]
  },
  {
    "identityId": "62f72623e011cf10c8851e4c",
    "extIdpId": "62f209327xxxxcc10d966ee5",
    "provider": "lark",
    "type": "user_id",
    "userIdInIdp": "23ded785",
    "originConnIds": ["62f2093244fa5cb19ff21ed3"]
  }
]
```

可以看到，我们获取到了用户在飞书中的身份信息：

- `open_id`: ou_8bae746eac07cd2564654140d2a9ac61
- `union_id`: on_093ce5023288856aa0abe4099123b18b
- `user_id`: 23ded785

绑定此外部身份源之后，后续用户就可以使用此身份源进行登录了，见**登录**接口。

  

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| ext_idp_conn_identifier | string  | 是 | - | 外部身份源连接唯一标志。  | `my-wechat` |
| app_id | string  | 是 | - | Authing 应用 ID。  |  |
| id_token | string  | 是 | - | 用户的 id_token。  |  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.link_extidp(
  
      ext_idp_conn_identifier: "my-wechat",
  
      app_id: "",
  
      id_token: "",
  
)
```



## 请求响应

类型： `GenerateBindExtIdpLinkRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GenerateBindExtIdpLinkDataDto">GenerateBindExtIdpLinkDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {}
}
```

## 数据结构


### <a id="GenerateBindExtIdpLinkDataDto"></a> GenerateBindExtIdpLinkDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| url | string | 是 | 用户绑定外部身份源的链接。  |  |


