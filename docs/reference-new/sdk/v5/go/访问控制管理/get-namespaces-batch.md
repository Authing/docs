# 批量获取权限分组详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

批量获取权限分组详情

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| codeList | array  | 是 |  | 资源 code 列表,批量可以使用逗号分隔。 示例值： `code1,code2` |


## 示例代码

```go
package main

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

    response := client.getNamespacesBatch(
    
     
        codeList: "code1,code2"        
  )
}
```



## 请求响应

类型： `NamespaceListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 权限分组列表 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "code": "my-namespace",
    "name": "我的权限分组",
    "description": "我的权限分组描述"
  }
}
```

## 数据结构


### <a id="NamespaceDto"></a> NamespaceDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 权限分组唯一标志符。 示例值： `my-namespace`  |
| name | string | 否 | 权限分组名称。 示例值： `我的权限分组`  |
| description | string | 否 | 权限分组描述信息。 示例值： `我的权限分组描述`  |


