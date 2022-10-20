# 身份源下应用的连接详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

在身份源详情页获取应用的连接情况

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | id | string  | 是 | - | 身份源 ID  | `6268b0e5e4b9a0e8ffa8fd60` |
 | tenantId | string  | 否 | - | 租户 ID  | `60b49eb83fd80adb96f26e68` |
 | appId | string  | 否 | - | 应用 ID  | `60b49eb83fd80adb96f26e68` |
 | type | string  | 否 | - | 身份源类型  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.ext_idp_conn_apps(
  
      id: "6268b0e5e4b9a0e8ffa8fd60",
  
      tenant_id: "60b49eb83fd80adb96f26e68",
  
      app_id: "60b49eb83fd80adb96f26e68",
  
      type: "undefined",
  
)
```
 -->


## 请求响应

类型： `ExtIdpListPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ExtIdpListPagingDto">ExtIdpListPagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "id": "60b49eb83fd80adb96f26e68",
      "name": "default",
      "logo": "https://files.authing.co/authing-console/social-connections/wechatIdentitySource.svg",
      "tenantId": "60b49eb83fd80adb96f26e68",
      "type": "wechat"
    }
  }
}
```

## 数据结构


### <a id="ExtIdpListPagingDto"></a> ExtIdpListPagingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数   |  |
| list | array | 是 | 响应数据 嵌套类型：<a href="#ExtIdpDto">ExtIdpDto</a>。  |  |


### <a id="ExtIdpDto"></a> ExtIdpDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| id | string | 是 | 身份源 id   |  `60b49eb83fd80adb96f26e68` |
| name | string | 是 | 身份源名称   |  `default` |
| logo | string | 是 | 身份源的 Logo   |  `https://files.authing.co/authing-console/social-connections/wechatIdentitySource.svg` |
| tenantId | string | 否 | 租户 ID   |  `60b49eb83fd80adb96f26e68` |
| type | string | 是 | 身份源类型   |  `wechat` |


