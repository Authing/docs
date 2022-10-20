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

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| id | string  | 是 | - | 身份源 ID。  | `6268b0e5e4b9a0e8ffa8fd60` |
| tenantId | string  | 否 | - | 租户 ID。  | `60b49eb83fd80adb96f26e68` |
| appId | string  | 否 | - | 应用 ID。  | `60b49eb83fd80adb96f26e68` |
| type |   | 否 | - | 身份源类型。  |  |


## 示例代码

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class ManagementClientTest {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        
         
        request.setId("6268b0e5e4b9a0e8ffa8fd60"); 
        request.setTenantId("60b49eb83fd80adb96f26e68"); 
        request.setAppId("60b49eb83fd80adb96f26e68"); 
        request.setType(undefined);
        ExtIdpListPaginatedRespDto response = managementClient.extIdpConnApps(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `ExtIdpListPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpListPagingDto">ExtIdpListPagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
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

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  |
| list | array | 是 | 响应数据。嵌套类型：<a href="#ExtIdpDto">ExtIdpDto</a>。  |  |


### <a id="ExtIdpDto"></a> ExtIdpDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| id | string | 是 | 身份源 id。  |  `60b49eb83fd80adb96f26e68` |
| name | string | 是 | 身份源名称。  |  `default` |
| logo | string | 是 | 身份源的 Logo。  |  `https://files.authing.co/authing-console/social-connections/wechatIdentitySource.svg` |
| tenantId | string | 否 | 租户 ID。  |  `60b49eb83fd80adb96f26e68` |
| type | string | 是 | 身份源类型。  |  `wechat` |


