# 生成用于登录的二维码

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

生成用于登录的二维码，目前支持生成微信公众号扫码登录、小程序扫码登录、自建移动 APP 扫码登录的二维码。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| type | string | 是 | - | 二维码类型。当前支持三种类型：
- `MOBILE_APP`: 自建移动端 APP 扫码
- `WECHAT_MINIPROGRAM`: 微信小程序扫码
- `WECHAT_OFFICIAL_ACCOUN` 关注微信公众号扫码。  枚举值：`MOBILE_APP`,`WECHAT_MINIPROGRAM`,`WECHAT_OFFICIAL_ACCOUNT` | `MOBILE_APP` |
| extIdpConnId | string | 否 | - | 当 `type` 为 `WECHAT_MINIPROGRAM` 或 `WECHAT_OFFICIAL_ACCOUNT` 时，可以指定身份源连接，否则默认使用应用开启的第一个对应身份源连接生成二维码。。   | `62eb7ed1f04xxxxc6955b329` |
| customData | object | 否 | - | 当 `type` 为 `MOBILE_APP` 时，可以传递用户的自定义数据，当用户成功扫码授权时，会将此数据存入用户的自定义数据。。   | `{"school":"hust"}` |
| context | object | 否 | - | 当 type 为 `WECHAT_OFFICIAL_ACCOUNT` 或 `WECHAT_MINIPROGRAM` 时，指定自定义的 pipeline 上下文，将会传递的 pipeline 的 context 中。   | `{"source":"utm"}` |
| autoMergeQrCode | boolean | 否 | - | 当 type 为 `WECHAT_MINIPROGRAM` 时，是否将自定义的 logo 自动合并到生成的图片上，默认为 false。服务器合并二维码的过程会加大接口响应速度，推荐使用默认值，在客户端对图片进行拼接。如果你使用 Authing 的 SDK，可以省去手动拼接的过程。。   |  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.gene_qrcode(
     type: "MOBILE_APP",
     ext_idp_conn_id: "62eb7ed1f04xxxxc6955b329",
     custom_data: {
			"school":	"hust"
		},
     context: {
			"source":	"utm"
		},
     auto_merge_qr_code: false,
  
)
```



## 请求响应

类型： `GeneQRCodeRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GeneQRCodeDataDto">GeneQRCodeDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "qrcodeId": "gQE-8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMGJjX",
    "url": "https://files.authing.co/user-contentsqrcode/59f86b4832eb28071bdd9214/gQE-8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMGJjX1ZhOFNiM1UxV29GVTF5MWMAAgQY4_RiAwSAxhMA.png",
    "customLogoUrl": "https://files.authing.co/authing-console/social-connections/wechatMiniLogin.svg"
  }
}
```

## 数据结构


### <a id="GeneQRCodeDataDto"></a> GeneQRCodeDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| qrcodeId | string | 是 | 二维码唯一 ID，可以通过此唯一 ID 查询二维码状态。。  |  `gQE-8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMGJjX` |
| url | string | 是 | 二维码 URL，前端可以基于此链接渲染二维码。。  |  `https://files.authing.co/user-contentsqrcode/59f86b4832eb28071bdd9214/gQE-8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMGJjX1ZhOFNiM1UxV29GVTF5MWMAAgQY4_RiAwSAxhMA.png` |
| customLogoUrl | string | 否 | 如果是小程序扫码登录，并且请求参数 autoMergeQrCode 设置为 false，会返回配置的自定义 Logo，前端可以自行将此 Logo 拼接到二维码 URL 上。。  |  `https://files.authing.co/authing-console/social-connections/wechatMiniLogin.svg` |


