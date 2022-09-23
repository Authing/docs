# 分页获取数据策略简略信息详情列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

分页获取数据策略简略信息详情列表,仅查找出 数据策略 ID、数据策略名称和数据策略等基本信息。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| query | string  | 否 | - | 关键字搜索，可以是策略名称或者策略 Code,限制 50 字符以内。  | `示例1` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.list_simple_data_policies(
  
      page: 1,
  
      limit: 10,
  
      query: "示例1",
  
)
```



## 请求响应

类型： `ListSimpleDataPoliciesPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DataPoliciesSimplePaginatedRespDto">DataPoliciesSimplePaginatedRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "totalCount": 20,
    "list": {
      "policyId": "60b49XXXXXXXXXXXX6e68",
      "policyName": "数据资源",
      "description": "这个是一个示例数据策略源"
    }
  }
}
```

## 数据结构


### <a id="DataPoliciesSimplePaginatedRespDto"></a> DataPoliciesSimplePaginatedRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 否 | 记录总数。 示例值： `20`  |
| list | array | 是 | 数据。嵌套类型：<a href="#ListSimpleDataPoliciesRespDto">ListSimpleDataPoliciesRespDto</a>。   |


### <a id="ListSimpleDataPoliciesRespDto"></a> ListSimpleDataPoliciesRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| policyId | string | 是 | 数据策略 ID。 示例值： `60b49XXXXXXXXXXXX6e68`  |
| policyName | string | 是 | 数据策略名称应用内唯一,限长 50 字符。 示例值： `数据资源`  |
| description | string | 是 | 数据策略描述， 限长 200 字符。 示例值： `这个是一个示例数据策略源`  |


