# 判断用户是否有某个角色

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，判断用户是否有某个角色，支持传入多个角色，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| roles | <a href="#HasRoleRolesDto">HasRoleRolesDto[]</a> | 是 | - | 角色列表。  |  |
| userId | string | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| options | <a href="#HasAnyRoleOptionsDto">HasAnyRoleOptionsDto</a> | 否 | - | 可选参数。  |  |


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
    
        HasAnyRoleReqDto request = new HasAnyRoleReqDto();
        request.setUserId("6229ffaxxxxxxxxcade3e3d9");
            Roles= new List<HasRoleRolesDto>(
                    new HasRoleRolesDto().set

               request.setNamespace("default");
      request.setCode("admin");
      
                  ),
            Options= new HasAnyRoleOptionsDto(
                    request.setUserIdType(HasAnyRoleOptionsDto.userIdType.USER_ID);
        ),
        
        HasAnyRoleRespDto response = managementClient.hasAnyRole(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `HasAnyRoleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#HasAnyRoleDto">HasAnyRoleDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "hasAnyRole": true
  }
}
```

## 数据结构


### <a id="HasRoleRolesDto"></a> HasRoleRolesDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| namespace | string | 否 | 所属权限分组的 code。 示例值： `default`  |
| code | string | 是 | 角色 code。 示例值： `admin`  |


### <a id="HasAnyRoleOptionsDto"></a> HasAnyRoleOptionsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userIdType | string | 否 | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username`  |


### <a id="HasAnyRoleDto"></a> HasAnyRoleDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| hasAnyRole | boolean | 是 | 是否拥有其中某一个角色。 示例值： `true`  |


