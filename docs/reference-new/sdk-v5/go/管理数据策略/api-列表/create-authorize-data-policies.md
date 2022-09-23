# 数据策略创建主体授权

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

数据策略创建主体授权,通过授权主体和数据策略进行互相授权

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetList | <a href="#SubjectDto">SubjectDto[]</a> | 是 | - | 数据权限列表，每个策略下所有的数据权限。   |  |
| policyIdList | string[] | 是 | - | 数据策略 id 列表。   | `["6301ceaad4677b9255f27478","6301ceaad4677b9255f27478"]` |


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

    response := client.createAuthorizeDataPolicies(
      dto.CreateAuthorizeDataPolicyDto {
          PolicyIdList: []string{"6301ceaad4677b9255f27478","6301ceaad4677b9255f27478",},
        TargetList: []SubjectDto{
                    dto.SubjectDto
                    {
                     Id: "6301ceXXXXXXXXXXXXXXXXX78",
            Type: SubjectDto.type.USER,
            Name: "test",
                }
                  },
    }
  )
}
```



## 请求响应

类型： `CommonResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功"
}
```

## 数据结构


### <a id="SubjectDto"></a> SubjectDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 主体 ID ，包含用户 ID、用户组 ID、角色 ID、组织机构 ID。 示例值： `6301ceXXXXXXXXXXXXXXXXX78`  |
| type | string | 是 | 主体类型,包括 USER、GROUP、ROLE、ORG 四种类型。 枚举值：`USER`,`ORG`,`GROUP`,`ROLE`  |
| name | string | 否 | 主体名称，包含用户名称、用户组名称、角色名称、组织机构名称。 示例值： `test`  |


