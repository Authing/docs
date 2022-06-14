# 获取已归档的用户列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取已归档的用户列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。 示例值： `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。 示例值： `10` |


## 示例代码

```go
import (
    "authing-go-sdk/client"
    "authing-go-sdk/dto"

    "fmt"
)

func main() {
    options := client.ManagementClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := client.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.listArchivedUsers(
    
     
        page: 1        , 
        limit: 10        
  )
}
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
      "userId": "wejfownefoweofmweomwer"
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
| userId | string | 是 | 用户 ID。 示例值： `wejfownefoweofmweomwer`  |


