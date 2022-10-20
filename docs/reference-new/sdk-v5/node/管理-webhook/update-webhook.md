# 修改 Webhook 配置

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

需要指定 webhookId，可选 Webhoook 名称、Webhook 回调地址、请求数据格式、用户真实名称、是否启用、请求密钥参数进行修改 webhook

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| webhookId | string | 是 | - | Webhook ID。   | `6229ffaxxxxxxxxcade3e3d9` |
| name | string | 否 | - | Webhook 名称。   | `用户创建事件` |
| url | string | 否 | - | Webhook 回调地址。   | `https://example.com/callback` |
| events | string[] | 否 | - | 用户真实名称，不具备唯一性。 示例值: 张三。   | `["user:created"]` |
| contentType | string | 否 | - | 请求数据格式。  枚举值：`application/json`,`application/x-www-form-urlencoded` | `application/json` |
| enabled | boolean | 否 | - | 是否启用。   | `true` |
| secret | string | 否 | - | 请求密钥。   | `xxxxxxxxxxxx` |


## 示例代码

```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.updateWebhook({
    webhookId: '6229ffaxxxxxxxxcade3e3d9',
    name: '用户创建事件',
    url: 'https://example.com/callback',
    events: ["user:created"],
    contentType: 'application/json',
    enabled: true,
    secret: 'xxxxxxxxxxxx',
 });
})();
```



## 请求响应

类型： `UpdateWebhooksRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#WebhookDto">WebhookDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "webhookId": "6229ffaxxxxxxxxcade3e3d9",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "name": "用户创建事件",
    "url": "https://example.com/callback",
    "contentType": "application/json",
    "enabled": true,
    "events": "[\"user:created\"]",
    "secret": "xxxxxxxxxxxx"
  }
}
```

## 数据结构


### <a id="WebhookDto"></a> WebhookDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| webhookId | string | 是 | Webhook ID。  |  `6229ffaxxxxxxxxcade3e3d9` |
| createdAt | string | 是 | 创建时间。  |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间。  |  `2022-07-03T02:20:30.000Z` |
| name | string | 是 | Webhook 名称。  |  `用户创建事件` |
| url | string | 是 | Webhook 回调地址。  |  `https://example.com/callback` |
| contentType | string | 是 | 请求数据格式。  | 可选枚举值：`application/json`,`application/x-www-form-urlencoded` |
| enabled | boolean | 是 | 是否启用。  |  `true` |
| events | array | 否 | 用户真实名称，不具备唯一性。 示例值: 张三。  |  `["user:created"]` |
| secret | string | 否 | 请求密钥。  |  `xxxxxxxxxxxx` |


