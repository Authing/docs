# 获取 MAU 使用记录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池 MAU 使用记录

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| endTime | string  | 是 | - | 截止时间（年月日）。  | `20220802` |
| startTime | string  | 是 | - | 起始时间（年月日）。  | `20220202` |


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

    response := client.getMauPeriodUsageHistory(
    
     
        endTime: "20220802"        , 
        startTime: "20220202"        
  )
}
```



## 请求响应

类型： `CostGetMauPeriodUsageHistoryRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#MauPeriodUsageHistory">MauPeriodUsageHistory</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "records": {
      "periodStartTime": "20210901",
      "periodEndTime": "20220901",
      "amount": "0",
      "current": "0"
    }
  }
}
```

## 数据结构


### <a id="MauPeriodUsageHistory"></a> MauPeriodUsageHistory

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| records | array | 是 | 响应数据。嵌套类型：<a href="#MauPeriodUsageHistoryDto">MauPeriodUsageHistoryDto</a>。  |  |


### <a id="MauPeriodUsageHistoryDto"></a> MauPeriodUsageHistoryDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| periodStartTime | string | 是 | 周期开始时间(年月日)。  |  `20210901` |
| periodEndTime | string | 是 | 周期结束时间(年月日)。  |  `20220901` |
| amount | string | 是 | 当前周期使用的 mau 总数量。  |  `0` |
| current | string | 是 | 当前周期使用的 mau 数量。  |  `0` |


