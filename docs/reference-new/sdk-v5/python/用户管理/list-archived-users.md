# 获取已归档的用户列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取已归档的用户列表，支持分页，可以筛选开始时间等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| startAt | number  | 否 | - | 开始时间，为精确到秒的 UNIX 时间戳，默认不指定。  | `1655714763890` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.list_archived_users(
  
      page: 1,
  
      limit: 10,
  
      start_at: 1655714763890,
  
)
```



## 请求响应

类型： `ListArchivedUsersSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ArchivedUsersListPagingDto">ArchivedUsersListPagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "userId": "userId",
      "archivedAt": "2022-07-03T02:20:30.000Z"
    }
  }
}
```

## 数据结构


### <a id="ArchivedUsersListPagingDto"></a> ArchivedUsersListPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#ListArchivedUsersRespDto">ListArchivedUsersRespDto</a>。   |


### <a id="ListArchivedUsersRespDto"></a> ListArchivedUsersRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。 示例值： `userId`  |
| archivedAt | string | 是 | 归档时间。 示例值： `2022-07-03T02:20:30.000Z`  |


