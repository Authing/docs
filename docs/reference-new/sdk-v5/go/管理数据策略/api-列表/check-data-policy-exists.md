# 校验数据策略名称是否有效

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过数据策略名称查询当前用户池内是否有效

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| policyName | string  | 是 | - | 数据策略名称应用内唯一,限长 50 字符。  | `数据资源` |


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

    response := client.checkDataPolicyExists(
    
     
        policyName: "数据资源"        
  )
}
```



## 请求响应

类型： `CheckParamsDataPolicyResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#CheckParamsDataPolicyRespDto">CheckParamsDataPolicyRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "isValid": " false",
    "message": " data Policy name already exist"
  }
}
```

## 数据结构


### <a id="CheckParamsDataPolicyRespDto"></a> CheckParamsDataPolicyRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| isValid | boolean | 是 | 数据策略名称校验是否有效。 示例值： ` false`  |
| message | boolean | 是 | 数据策略名称校验失败提示信息,如果校验成功, message 不返回。 示例值： ` data Policy name already exist`  |


