# 判断用户是否在某个部门下

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过组织 code、部门 ID，判断用户是否在某个部门下，可以选择包含子部门。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| departmentId | string  | 是 | - | 部门 ID，根部门传 `root`。departmentId 和 departmentCode 必传其一。。  | `root` |
| organizationCode | string  | 是 | - | 组织 code。  | `steamory` |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| departmentIdType | string  | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` | `department_id` |
| includeChildrenDepartments | boolean  | 否 | - | 是否包含子部门。  |  |


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
    
        
         
        request.setDepartmentId("root"); 
        request.setOrganizationCode("steamory"); 
        request.setUserId("6229ffaxxxxxxxxcade3e3d9"); 
        request.setDepartmentIdType("department_id"); 
        request.setIncludeChildrenDepartments(false);
        IsUserInDepartmentRespDto response = managementClient.isUserInDepartment(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `IsUserInDepartmentRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsUserInDepartmentDataDto">IsUserInDepartmentDataDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "inDepartment": true
  }
}
```

## 数据结构


### <a id="IsUserInDepartmentDataDto"></a> IsUserInDepartmentDataDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| inDepartment | boolean | 是 | 是否在此部门内。 示例值： `true`  |


