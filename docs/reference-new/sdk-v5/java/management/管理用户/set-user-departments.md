# 设置用户所在部门

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，设置用户所在部门，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| departments | <a href="#SetUserDepartmentDto">SetUserDepartmentDto[]</a> | 是 | - | 部门信息 数组长度限制：10。 | `[{"departmentId":"60b49eb83fd80adb96f26e68","isLeader":true,"isMainDepartment":true}]` |
| userId | string | 是 | - | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| options | <a href="#SetUserDepartmentsOptionsDto">SetUserDepartmentsOptionsDto</a> | 否 | - | 可选参数  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class Test {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        SetUserDepartmentsDto request = new SetUserDepartmentsDto();
        request.setUserId("6229ffaxxxxxxxxcade3e3d9");
            Departments= new List<SetUserDepartmentDto>(
                    new SetUserDepartmentDto().set

               request.setDepartmentId("60b49eb83fd80adb96f26e68");
      request.setIsLeader(true);
      request.setIsMainDepartment(true);
      
                  ),
            Options= new SetUserDepartmentsOptionsDto(
                    request.setUserIdType(SetUserDepartmentsOptionsDto.userIdType.USER_ID);
        ),
        
        IsSuccessRespDto response = managementClient.setUserDepartments(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="SetUserDepartmentDto"></a> SetUserDepartmentDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| departmentId | string | 是 | 部门 id   |  `60b49eb83fd80adb96f26e68` |
| isLeader | boolean | 否 | 是否是部门 leader   |  `true` |
| isMainDepartment | boolean | 否 | 是否是主部门   |  `true` |


### <a id="SetUserDepartmentsOptionsDto"></a> SetUserDepartmentsOptionsDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| userIdType | string | 否 | 用户 ID 类型，默认值为 `user_id`，可选值为：<br>- `user_id`: Authing 用户 ID，如 `6319a1504f3xxxxf214dd5b7`<br>- `phone`: 用户手机号<br>- `email`: 用户邮箱<br>- `username`: 用户名<br>- `external_id`: 用户在外部系统的 ID，对应 Authing 用户信息的 `externalId` 字段<br>- `identity`: 用户的外部身份源信息，格式为 `<extIdpId>:<userIdInIdp>`，其中 `<extIdpId>` 为 Authing 身份源的 ID，`<userIdInIdp>` 为用户在外部身份源的 ID。<br>示例值：`62f20932716fbcc10d966ee5:ou_8bae746eac07cd2564654140d2a9ac61`。<br>   | user_id |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功   |  `true` |


