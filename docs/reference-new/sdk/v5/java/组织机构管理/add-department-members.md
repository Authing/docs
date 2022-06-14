# 部门下添加成员

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

部门下添加成员

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| departmentId | string | 是 |  | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68` |
| organizationCode | string | 是 |  | 组织 code。 示例值： `steamory` |
| departmentIdType | string | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` |
| userIds | array | 是 |  | 用户 ID 列表。 示例值： `["623c20b2a062aaaaf41b17da"]` |


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
    
        AddDepartmentMembersReqDto request = new AddDepartmentMembersReqDto();
        request.setDepartmentId("60b49eb83fd80adb96f26e68");
        request.setOrganizationCode("steamory");
        request.setDepartmentIdType(AddDepartmentMembersReqDto.departmentIdType.DEPARTMENT_ID);
        request.setUserIds(new List<String>("623c20b2a062aaaaf41b17da",));
        
        IsSuccessRespDto response = managementClient.addDepartmentMembers(request);
        System.out.println(response);
    }
}
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

```json
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


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


