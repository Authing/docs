# 检查数据资源名称或数据资源 Code 是否有效 

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过数据资源名称和所属应用 ID,或者数据资源 Code 和所属应用 ID 查询当前应用内是否有效

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appId | string  | 是 | - | 数据资源所属的应用 id。  | `60b49eb83fd80adb96f26e68` |
| resourceName | string  | 否 | - | 数据资源名称,应用内唯一。  | `数据资源` |
| resourceCode | string  | 否 | - | 数据资源 code,应用内唯一。  | `123` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.check_params_data_resource_exists(
  
      app_id: "60b49eb83fd80adb96f26e68",
  
      resource_name: "数据资源",
  
      resource_code: "123",
  
)
```



## 请求响应

类型： `CheckParamsDataResourceResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#CheckParamsDataResourceRespDto">CheckParamsDataResourceRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "isValid": " false",
    "message": " data resource name already exist"
  }
}
```

## 数据结构


### <a id="CheckParamsDataResourceRespDto"></a> CheckParamsDataResourceRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| isValid | boolean | 是 | 数据资源名称或者 code 校验是否有效。 示例值： ` false`  |
| message | boolean | 是 | 数据资源名称或者 code 校验失败提示信息,如果校验成功, message 不返回。 示例值： ` data resource name already exist`  |


