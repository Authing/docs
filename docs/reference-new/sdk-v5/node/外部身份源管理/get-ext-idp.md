# 获取身份源详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过 身份源 ID，获取身份源详情，可以指定 租户 ID 筛选。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| id | string  | 是 | - | 身份源 ID。  | `6268b0e5e4b9a0e8ffa8fd60` |
| tenantId | string  | 否 | - | 租户 ID。  | `60b49eb83fd80adb96f26e68` |


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
  const result = await managementClient.getExtIdp({

    id: '6268b0e5e4b9a0e8ffa8fd60',

    tenantId: '60b49eb83fd80adb96f26e68',
 });
})();
```



## 请求响应

类型： `ExtIdpDetailSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpDetail">ExtIdpDetail</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "id": "60b49eb83fd80adb96f26e68",
    "name": "default",
    "tenantId": "60b49eb83fd80adb96f26e68",
    "type": "wechat",
    "autoJoin": true
  }
}
```

## 数据结构


### <a id="ExtIdpDetail"></a> ExtIdpDetail

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 身份源 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| name | string | 是 | 身份源名称。 示例值： `default`  |
| tenantId | string | 否 | 租户 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| type | string | 是 | 身份源类型。 示例值： `wechat`  |
| connections | object | 是 | 身份源的连接列表。   |
| autoJoin | boolean | 是 | 租户场景下自动加入。 示例值： `true`  |


