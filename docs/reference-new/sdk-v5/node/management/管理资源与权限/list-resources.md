# 分页获取资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据筛选条件，分页获取资源详情列表。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| type | string  | 否 | - | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`,`UI` | `DATA` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |


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
  const result = await managementClient.listResources({

    namespace: 'default',

    type: 'DATA',

    page: 1,

    limit: 10,
 });
})();
```



## 请求响应

类型： `ResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ResourcePagingDto">ResourcePagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "statusCode": 200,
    "message": "操作成功",
    "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
    "list": {
      "code": "ecs",
      "description": "服务器",
      "name": "服务器",
      "type": "API",
      "actions": "[{\"name\":\"ecs:Start\",\"description\":\"启动 ECS 服务器\"},{\"name\":\"ecs:Stop\",\"description\":\"停止 ECS 服务器\"}]",
      "apiIdentifier": "https://my-awesome-api.com/api",
      "namespace": "default"
    }
  }
}
```

## 数据结构


### <a id="ResourcePagingDto"></a> ResourcePagingDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| statusCode | number | 是 | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。。  |  `200` |
| message | string | 是 | 描述信息。  |  `操作成功` |
| apiCode | number | 否 | 细分错误码，可通过此错误码得到具体的错误类型。。  |  |
| requestId | string | 否 | 请求 ID。当请求失败时会返回。。  |  `934108e5-9fbf-4d24-8da1-c330328abd6c` |
| totalCount | number | 是 | 记录总数。  |  |
| list | array | 是 | 数据。嵌套类型：<a href="#ResourceDto">ResourceDto</a>。  |  |


### <a id="ResourceDto"></a> ResourceDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 是 | 资源唯一标志符。  |  `ecs` |
| description | string | 否 | 资源描述。  |  `服务器` |
| name | string | 否 | 资源名称。  |  `服务器` |
| type | string | 是 | 资源类型，如数据、API、按钮、菜单。  | 可选枚举值：`DATA`,`API`,`MENU`,`BUTTON`,`UI` |
| actions | array | 否 | 资源定义的操作类型。嵌套类型：<a href="#ResourceAction">ResourceAction</a>。数组长度限制：100。  |  `[{"name":"ecs:Start","description":"启动 ECS 服务器"},{"name":"ecs:Stop","description":"停止 ECS 服务器"}]` |
| apiIdentifier | string | 否 | API 资源的 URL 标识。  |  `https://my-awesome-api.com/api` |
| namespace | string | 否 | 所属权限分组的 code。  |  `default` |
| linkedToTenant | boolean | 否 | 租户应用是否关联自建应用资源。  |  |


### <a id="ResourceAction"></a> ResourceAction

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | 资源操作名称。  |  `ecs:Start` |
| description | string | 是 | 资源操作描述。  |  `ecs:Start` |


