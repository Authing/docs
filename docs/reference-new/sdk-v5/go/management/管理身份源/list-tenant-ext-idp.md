# 租户控制台获取身份源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

在租户控制台内获取身份源列表，可以根据 应用 ID 筛选。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| tenantId | string  | 否 | - | 租户 ID。  | `60b49eb83fd80adb96f26e68` |
| appId | string  | 否 | - | 应用 ID。  | `60b49eb83fd80adb96f26e68` |
| type | string  | 否 | - | 身份源类型。 枚举值：`social`,`enterprise` |  |
| page | string  | 否 | - | 页码。  |  |
| limit | string  | 否 | - | 每页获取的数据量。  |  |


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

    response := client.listTenantExtIdp(
    
     
        tenantId: "60b49eb83fd80adb96f26e68"        , 
        appId: "60b49eb83fd80adb96f26e68"        , 
        type: "undefined"        , 
        page: "undefined"        , 
        limit: "undefined"        
  )
}
```



## 请求响应

类型： `ExtIdpListPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ExtIdpListPagingDto">ExtIdpListPagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "id": "60b49eb83fd80adb96f26e68",
      "name": "default",
      "logo": "https://files.authing.co/authing-console/social-connections/wechatIdentitySource.svg",
      "tenantId": "60b49eb83fd80adb96f26e68",
      "type": "wechat"
    }
  }
}
```

## 数据结构


### <a id="ExtIdpListPagingDto"></a> ExtIdpListPagingDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  |
| list | array | 是 | 响应数据。嵌套类型：<a href="#ExtIdpDto">ExtIdpDto</a>。  |  |


### <a id="ExtIdpDto"></a> ExtIdpDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| id | string | 是 | 身份源 id。  |  `60b49eb83fd80adb96f26e68` |
| name | string | 是 | 身份源名称。  |  `default` |
| logo | string | 是 | 身份源的 Logo。  |  `https://files.authing.co/authing-console/social-connections/wechatIdentitySource.svg` |
| tenantId | string | 否 | 租户 ID。  |  `60b49eb83fd80adb96f26e68` |
| type | string | 是 | 身份源类型。  |  `wechat` |


