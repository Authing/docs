# 分页获取资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

分页获取资源列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| namespace | string  | 否 |  | 所属权限分组的 code。 示例值： `default` |
| type | string  | 否 |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。 示例值： `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。 示例值： `10` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.list_resources(
  
      namespace: "default",
  
      type: "DATA",
  
      page: 1,
  
      limit: 10,
  
)
```



## 请求响应

类型： `ResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ResourcePagingDto">ResourcePagingDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "statusCode": 200,
    "message": "操作成功",
    "apiCode": 20001,
    "list": {
      "code": "ecs",
      "description": "服务器",
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

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| statusCode | number | 是 | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。。 示例值： `200`  |
| message | string | 是 | 描述信息。 示例值： `操作成功`  |
| apiCode | number | 否 | 细分错误码，可通过此错误码得到具体的错误类型。。 示例值： `20001`  |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 数据。嵌套类型：<a href="#ResourceDto">ResourceDto</a>。   |


### <a id="ResourceDto"></a> ResourceDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 资源唯一标志符。 示例值： `ecs`  |
| description | string | 否 | 资源描述。 示例值： `服务器`  |
| type | string | 是 | 资源类型，如数据、API、按钮、菜单。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
| actions | array | 否 | 资源定义的操作类型。嵌套类型：<a href="#ResourceAction">ResourceAction</a>。 示例值： `[{"name":"ecs:Start","description":"启动 ECS 服务器"},{"name":"ecs:Stop","description":"停止 ECS 服务器"}]`  |
| apiIdentifier | string | 否 | API 资源的 URL 标识。 示例值： `https://my-awesome-api.com/api`  |
| namespace | string | 否 | 所属权限分组的 code。 示例值： `default`  |


### <a id="ResourceAction"></a> ResourceAction

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| name | string | 是 | 资源操作名称。 示例值： `ecs:Start`  |
| description | string | 是 | 资源操作描述。 示例值： `ecs:Start`  |


