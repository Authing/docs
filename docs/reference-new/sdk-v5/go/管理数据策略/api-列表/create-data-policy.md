# 创建数据策略

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建数据策略,通过数据策略名称、数据策略描述和相关的权限等字段创建

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| dataPermissionList | <a href="#DataPermissionDto">DataPermissionDto[]</a> | 是 | - | 数据权限列表，每个策略下所有的数据权限。   |  |
| description | string | 是 | - | 数据策略描述， 限长 200 字符。   | `这个是一个示例数据策略源` |
| policyName | string | 是 | - | 数据策略名称应用内唯一,限长 50 字符。   | `数据资源` |


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

    response := client.createDataPolicy(
      dto.CreateDataPolicyDto {
          PolicyName: "数据资源",
          Description: "这个是一个示例数据策略源",
        DataPermissionList: []DataPermissionDto{
                    dto.DataPermissionDto
                    {
                     AppId: "60b49eb83fd80adb96f26e68",
            ResourceId: "6301ceaad4677b9255f27478",
          ResourceStruct: []DataResourcePolicyStructs{
                    dto.DataResourcePolicyStructs
                    {
                     Code: "123",
            Value: "这个是一个示例资源策略节点",
            Name: "数据资源",
            Action: "read",
            Enabled: false,
            Children: []string{"[object Object]",},
                }
                  },
                }
                  },
    }
  )
}
```



## 请求响应

类型： `CreateDataPolicyResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#CreateDataPolicyRespDto">CreateDataPolicyRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "policyId": "60b49XXXXXXXXXXXX6e68",
    "policyName": "数据资源",
    "description": "这个是一个示例数据策略源",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "dataPermissionList": {
      "appId": "60b49eb83fd80adb96f26e68",
      "resourceId": "6301ceaad4677b9255f27478",
      "resourceType": "TREE",
      "resourceStruct": {
        "code": "123",
        "value": "这个是一个示例资源策略节点",
        "name": "数据资源",
        "action": "read",
        "children": "[{\"code\":\"code1\",\"name\":\"子节点1\",\"value\":\"子节点值\",\"enabled\":false,\"action\":\"Create\",\"children\":[{\"code\":\"code2\",\"name\":\"子节点2\",\"value\":\"子节点2值\",\"enabled\":true,\"action\":\"Get\"}]}]"
      }
    }
  }
}
```

## 数据结构


### <a id="DataPermissionDto"></a> DataPermissionDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | 数据策略所在的应用 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| resourceId | string | 是 | 数据权限所属的数据资源 id。 示例值： `6301ceaad4677b9255f27478`  |
| resourceStruct | array | 是 | 数据权限所拥有的数据资源节点,根据不同的节点类型结构不同，目前仅支持 TREE 结构。嵌套类型：<a href="#DataResourcePolicyStructs">DataResourcePolicyStructs</a>。   |


### <a id="DataResourcePolicyStructs"></a> DataResourcePolicyStructs

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 数据资源策略节点 code, 同层级唯一, 限长 50 字符。 示例值： `123`  |
| value | string | 否 | 数据资源策略节点 value, 限长 1000 字符。 示例值： `这个是一个示例资源策略节点`  |
| name | string | 是 | 数据资源节点 name ，同层级唯一, 限长 50 字符。 示例值： `数据资源`  |
| action | string | 是 | 数据资源策略节点 action 动作。 示例值： `read`  |
| enabled | boolean | 是 | 数据资源策略节点是否开启动作。   |
| children | array | 是 | 子节点数据,子节点数据最多五个层级。 示例值： `[{"code":"code1","name":"子节点1","value":"子节点值","enabled":false,"action":"Create","children":[{"code":"code2","name":"子节点2","value":"子节点2值","enabled":true,"action":"Get"}]}]`  |


### <a id="CreateDataPolicyRespDto"></a> CreateDataPolicyRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| policyId | string | 是 | 数据策略 ID。 示例值： `60b49XXXXXXXXXXXX6e68`  |
| policyName | string | 是 | 数据策略名称应用内唯一,限长 50 字符。 示例值： `数据资源`  |
| description | string | 是 | 数据策略描述， 限长 200 字符。 示例值： `这个是一个示例数据策略源`  |
| createdAt | string | 是 | 数据策略创建时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| updatedAt | string | 是 | 数据策略更新时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| dataPermissionList | array | 是 | 数据权限列表，每个策略下所有的数据资源。嵌套类型：<a href="#CreateOrUpdateDataPermissionRespDto">CreateOrUpdateDataPermissionRespDto</a>。   |


### <a id="CreateOrUpdateDataPermissionRespDto"></a> CreateOrUpdateDataPermissionRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | 数据策略所在的应用 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| resourceId | string | 是 | 数据权限所属的数据资源 id。 示例值： `6301ceaad4677b9255f27478`  |
| resourceType | string | 是 | 数据权限所属的数据资源类型,目前仅支持 TREE 类型。 示例值： `TREE`  |
| resourceStruct | array | 是 | 数据权限所拥有的数据资源节点,根据不同的节点类型结构不同，目前仅支持 TREE 结构。嵌套类型：<a href="#DataResourcePolicyStructs">DataResourcePolicyStructs</a>。   |


### <a id="DataResourcePolicyStructs"></a> DataResourcePolicyStructs

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 数据资源策略节点 code, 同层级唯一, 限长 50 字符。 示例值： `123`  |
| value | string | 否 | 数据资源策略节点 value, 限长 1000 字符。 示例值： `这个是一个示例资源策略节点`  |
| name | string | 是 | 数据资源节点 name ，同层级唯一, 限长 50 字符。 示例值： `数据资源`  |
| action | string | 是 | 数据资源策略节点 action 动作。 示例值： `read`  |
| enabled | boolean | 是 | 数据资源策略节点是否开启动作。   |
| children | array | 是 | 子节点数据,子节点数据最多五个层级。 示例值： `[{"code":"code1","name":"子节点1","value":"子节点值","enabled":false,"action":"Create","children":[{"code":"code2","name":"子节点2","value":"子节点2值","enabled":true,"action":"Get"}]}]`  |


