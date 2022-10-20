# 取消同步风险操作

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

取消同步风险操作

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| syncRiskOperationIds | number[] | 是 | - | 同步任务风险操作 ID。   | `[1,2]` |


## 示例代码

```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.cancelSyncRiskOperation(
      dto.CancelSyncRiskOperationDto {
          SyncRiskOperationIds: []string{"1","2",},
    }
  )
}
```



## 请求响应

类型： `CancelSyncRiskOperationsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#CancelSyncRiskOperationsDataDto">CancelSyncRiskOperationsDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "successList": "[1,2]",
    "faildList": "[3,4]"
  }
}
```

## 数据结构


### <a id="CancelSyncRiskOperationsDataDto"></a> CancelSyncRiskOperationsDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| successList | array | 是 | 成功取消的风险操作任务。  |  `[1,2]` |
| faildList | array | 是 | 取消失败的风险操作任务。  |  `[3,4]` |


