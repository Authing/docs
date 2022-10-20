# 创建权限分组

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建权限分组，可以设置分组名称与描述信息。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| code | string | 是 | - | 权限分组唯一标志符。   | `my-namespace` |
| name | string | 否 | - | 权限分组名称。   | `我的权限分组` |
| description | string | 否 | - | 权限分组描述信息。   | `我的权限分组描述` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.create_namespace(
     code: "my-namespace",
     name: "我的权限分组",
     description: "我的权限分组描述",
  
)
```



## 请求响应

类型： `NamespaceRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#NamespaceDto">NamespaceDto</a> | 权限分组详情 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "code": "my-namespace",
    "name": "我的权限分组",
    "description": "我的权限分组描述"
  }
}
```

## 数据结构


### <a id="NamespaceDto"></a> NamespaceDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 是 | 权限分组唯一标志符。  |  `my-namespace` |
| name | string | 否 | 权限分组名称。  |  `我的权限分组` |
| description | string | 否 | 权限分组描述信息。  |  `我的权限分组描述` |


