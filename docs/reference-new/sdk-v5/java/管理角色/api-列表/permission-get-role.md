# 获取角色详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过角色 code 和 ApplicationId 获取角色详情，

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appId | string  | 是 | - | 应用 id。  | `6076bacxxxxxxxxd80d993b` |
| roleCode | string  | 是 | - | 角色 code,只能使用字母、数字和 -_，最多 50 字符。  | `code_1` |


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
    
        
         
        request.setAppId("6076bacxxxxxxxxd80d993b"); 
        request.setRoleCode("code_1");
        RolePermissionGetRespDto response = managementClient.permissionGetRole(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `RolePermissionGetRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GetRolePermissionRespDto">GetRolePermissionRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "roleId": "60b49eb83fd80adb96f26e68",
    "userPoolId": "6076bacxxxxxxxxd80d993b5",
    "roleName": "测试用户",
    "roleCode": "code_1",
    "description": "这个一个角色的描述信息",
    "appId": "6076bacxxxxxxxxd80d993b",
    "arn": "arn:cn:authing:62fXXXXXXXXXXXXXXXXX8aa0e:role:62fXXXXXXXXXXXXXXXXX8aa0e"
  }
}
```

## 数据结构


### <a id="GetRolePermissionRespDto"></a> GetRolePermissionRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| roleId | string | 是 | 角色 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| userPoolId | string | 是 | 所属用户池 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| roleName | string | 是 | 角色名称，最多 50 字符。 示例值： `测试用户`  |
| roleCode | string | 是 | 角色 code,只能使用字母、数字和 -_，最多 50 字符。 示例值： `code_1`  |
| description | string | 否 | 角色描述信息,最多两百字符。 示例值： `这个一个角色的描述信息`  |
| appId | string | 是 | 应用 id。 示例值： `6076bacxxxxxxxxd80d993b`  |
| arn | string | 是 | 角色所属的权限标识符 id, arnId。 示例值： `arn:cn:authing:62fXXXXXXXXXXXXXXXXX8aa0e:role:62fXXXXXXXXXXXXXXXXX8aa0e`  |


