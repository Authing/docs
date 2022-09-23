# 用户是否拥有某个资源的权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据用户id,权限应用id,资源路径查询是否有该资源path的权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| pathList | array[] | 是 | - | 资源路径列表。   | `["code/1/2/3"]` |
| appId | string | 是 | - | 权限应用id。   | `6301ceaad4677b9255f27478` |
| action | string | 是 | - | 资源操作。   | `read` |
| userId | string | 是 | - | 用户id。   | `6301ceaad4677b9255f27478` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.check_path_authentication(
     user_id: "6301ceaad4677b9255f27478",
     action: "read",
     app_id: "6301ceaad4677b9255f27478",
     path_list: ["code/1/2/3"],
  
)
```



## 请求响应

类型： `UserAuthenticationActionResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserAuthenticationActionRespDto">UserAuthenticationActionRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "path": "code/1/2/3",
    "action": "read",
    "enabled": true
  }
}
```

## 数据结构


### <a id="UserAuthenticationActionRespDto"></a> UserAuthenticationActionRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| path | string | 是 | 资源路径。 示例值： `code/1/2/3`  |
| action | string | 是 | 操作。 示例值： `read`  |
| enabled | boolean | 是 | 是否有该资源的权限。 示例值： `true`  |


