# 角色被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

角色被授权的资源列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| code  string  | 是 |  | 权限分组内角色的唯一标识符。 示例值： `60b49eb83fd80adb96f26e68` |
| namespace  string  | 否 |  | 所属权限分组的 code。 示例值： `default` |
| resourceType  string  | 否 |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_role_authorized_resources(
  
      code: "60b49eb83fd80adb96f26e68",
  
      namespace: "default",
  
      resource_type: "DATA",
  
)
```



## 请求响应

类型： `RoleAuthorizedResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RoleAuthorizedResourcePagingDto">RoleAuthorizedResourcePagingDto</a> | 数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "resourceCode": "ecs",
      "resourceType": "DATA",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]",
      "apiIdentifier": "dd8d7stf44"
    }
  }
}
```

## 数据结构


### <a id="RoleAuthorizedResourcePagingDto"></a> RoleAuthorizedResourcePagingDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totalCount | number | 是 |  | 记录总数。   |
| list | array | 是 |  | 数据。嵌套类型：<a href="#RoleAuthorizedResourcesRespDto">RoleAuthorizedResourcesRespDto</a>。   |


### <a id="RoleAuthorizedResourcesRespDto"></a> RoleAuthorizedResourcesRespDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| resourceCode | string | 是 |  | 资源描述符。 示例值： `ecs`  |
| resourceType | string | 是 |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
| actions | array | 是 |  | 被授权的操作列表。 示例值： `["ecs:Start","ecs:Stop"]`  |
| apiIdentifier | string | 是 |  | 资源对应的 API Identifier。 示例值： `dd8d7stf44`  |


