# 批量创建权限分组

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

批量创建权限分组

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| list | body | array | \* |  | 权限分组列表。  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.create_namespaces_batch(
     list: [{
           code: "my-namespace",
         name: "我的权限分组",
         description: "我的权限分组描述",
      }],
  
)
```



## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="CreateNamespacesBatchItemDto"></a> CreateNamespacesBatchItemDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| code | string | \* |  | 权限分组唯一标志符。 示例值： `my-namespace`  |
  | name | string |  |  | 权限分组名称。 示例值： `我的权限分组`  |
  | description | string |  |  | 权限分组描述信息。 示例值： `我的权限分组描述`  |
  

### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| success | boolean | \* |  | 操作是否成功。 示例值： `true`  |
  

