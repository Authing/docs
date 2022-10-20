# 获取所有权益

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池所有权益

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_all_rights_items(
  
)
```



## 请求响应

类型： `CostGetAllRightItemRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#RightItemRes">RightItemRes</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "rightsItems": {
      "rightsModelCode": "SocialConnections",
      "rightsModelName": "SocialConnections",
      "dataType": "1：数量类型，2：数字只读，不做计量，3：断言类型，4：字符串只读",
      "dataValue": "0"
    }
  }
}
```

## 数据结构


### <a id="RightItemRes"></a> RightItemRes

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| rightsItems | array | 是 | 响应数据。嵌套类型：<a href="#RightItemDto">RightItemDto</a>。  |  |


### <a id="RightItemDto"></a> RightItemDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| rightsModelCode | string | 是 | 权益编码。  |  `SocialConnections` |
| rightsModelName | string | 是 | 权益名称。  |  `SocialConnections` |
| dataType | string | 是 | 权益数据类型。  |  `1：数量类型，2：数字只读，不做计量，3：断言类型，4：字符串只读` |
| dataValue | string | 是 | 权益值。  |  `0` |


