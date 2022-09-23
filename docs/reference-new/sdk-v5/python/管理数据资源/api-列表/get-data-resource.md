# 获取数据资源详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过数据资源 ID 获取对应数据资源的详细信息,包含数据资源名称、Code、类型、所属应用等基本信息

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resourceId | string  | 是 | - | 数据资源 Id,应用内唯一。  | `60b49eXXXXXXXXXXXXXXXXf26e68` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_data_resource(
  
      resource_id: "60b49eXXXXXXXXXXXXXXXXf26e68",
  
)
```



## 请求响应

类型： `GetDataResourceResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GetDataResourceRespDto">GetDataResourceRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "resourceId": "60b49eXXXXXXXXXXXXXXXXf26e68",
    "resourceName": "数据资源",
    "resourceCode": "123",
    "type": "TREE",
    "appId": "60b49eb83fd80adb96f26e68",
    "description": "这个是一个示例数据资源",
    "struct": {
      "code": "123",
      "value": "这个是一个示例数据资源",
      "name": "数据资源",
      "children": "[{\"code\":\"code1\",\"name\":\"子节点1\",\"value\":\"子节点值\",\"children\":[{\"code\":\"code2\",\"name\":\"子节点2\",\"value\":\"子节点2值\"}]}]"
    }
  }
}
```

## 数据结构


### <a id="GetDataResourceRespDto"></a> GetDataResourceRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceId | string | 是 | 数据资源 Id,应用内唯一。 示例值： `60b49eXXXXXXXXXXXXXXXXf26e68`  |
| resourceName | string | 是 | 数据资源名称,应用内唯一。 示例值： `数据资源`  |
| resourceCode | string | 是 | 数据资源 code,应用内唯一。 示例值： `123`  |
| type | string | 是 | 数据资源类型，目前仅支持树结构。 示例值： `TREE`  |
| appId | string | 是 | 数据资源所属的应用 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| description | string | 否 | 数据资源描述。 示例值： `这个是一个示例数据资源`  |
| struct | array | 是 | 数据资源节点。嵌套类型：<a href="#DataResourceStructs">DataResourceStructs</a>。   |


### <a id="DataResourceStructs"></a> DataResourceStructs

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 数据资源节点 code, 同层级唯一, 限长 50 字符。 示例值： `123`  |
| value | string | 否 | 数据资源节点 value, 限长 1000 字符。 示例值： `这个是一个示例数据资源`  |
| name | string | 是 | 数据资源节点 name ，同层级唯一, 限长 50 字符。 示例值： `数据资源`  |
| children | array | 是 | 子节点数据,子节点数据最多五个层级。 示例值： `[{"code":"code1","name":"子节点1","value":"子节点值","children":[{"code":"code2","name":"子节点2","value":"子节点2值"}]}]`  |


