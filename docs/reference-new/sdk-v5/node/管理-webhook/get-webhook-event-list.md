# 获取 Webhook 事件列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

返回事件列表和分类列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


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
  const result = await managementClient.getWebhookEventList({
 });
})();
```



## 请求响应

类型： `WebhookEventListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#WebhookEventListData">WebhookEventListData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "categories": {
      "name": "用户",
      "nameEn": "User",
      "value": "user"
    },
    "events": {
      "name": "创建用户",
      "nameEn": "Create User",
      "value": "user:created",
      "category": "user"
    }
  }
}
```

## 数据结构


### <a id="WebhookEventListData"></a> WebhookEventListData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| categories | array | 是 | 分类列表。嵌套类型：<a href="#WebhookCategoryDto">WebhookCategoryDto</a>。  |  |
| events | array | 是 | 事件列表。嵌套类型：<a href="#WebhookEventDto">WebhookEventDto</a>。  |  |


### <a id="WebhookCategoryDto"></a> WebhookCategoryDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | Webhook 类型名称。  |  `用户` |
| nameEn | string | 是 | Webhook 类型英文名称。  |  `User` |
| value | string | 是 | Webhook 类型。  |  `user` |


### <a id="WebhookEventDto"></a> WebhookEventDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | Webhook 名称。  |  `创建用户` |
| nameEn | string | 是 | Webhook 英文名称。  |  `Create User` |
| value | string | 是 | Webhook 事件。  |  `user:created` |
| category | string | 是 | Webhook 事件分类。  |  `user` |


