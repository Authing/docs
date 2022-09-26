# 获取用户在某个资源路径下的权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据用户id,权限应用id,资源路径获取该资源path的权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| pathList | string[] | 是 | - | 资源路径列表。   | `["code/1/2/3"]` |
| appId | string | 是 | - | 权限应用id。   | `6301ceaad4677b9255f27478` |
| userId | string | 是 | - | 用户id。   | `6301ceaad4677b9255f27478` |


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

    response := client.getAuthenticationPath(
      dto.UserPathActionDto {
          UserId: "6301ceaad4677b9255f27478",
          AppId: "6301ceaad4677b9255f27478",
          PathList: []string{"code/1/2/3",},
    }
  )
}
```



## 请求响应

类型： `UserPathActionResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#AuthPathRes">AuthPathRes</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "path": "1/2/3"
  }
}
```

## 数据结构


### <a id="AuthPathRes"></a> AuthPathRes

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| path | string | 是 | 路径。 示例值： `1/2/3`  |
| actionList | array | 是 | 操作列表。   |


