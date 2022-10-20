# 获取资源被授权的主体

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取资源被授权的主体

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resource | string | 是 | - | 资源。   | `ecs:1` |
| namespace | string | 否 | default | 权限分组。   |  |
| resourceType | string | 否 | - | 资源类型。  枚举值：`DATA`,`API`,`MENU`,`BUTTON`,`UI` | `DATA` |
| targetType | string | 否 | - | 主体类型。  枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |
| actions | <a href="#GetAuthorizedResourceActionDto">GetAuthorizedResourceActionDto</a> | 否 | - | Action 列表。   |  |


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
    
        GetAuthorizedTargetsDto request = new GetAuthorizedTargetsDto();
        request.setNamespace("undefined");
        request.setResourceType(GetAuthorizedTargetsDto.resourceType.DATA);
        request.setResource("ecs:1");
        request.setTargetType(GetAuthorizedTargetsDto.targetType.USER);
            Actions= new GetAuthorizedResourceActionDto(
                    request.setOp(GetAuthorizedResourceActionDto.op.AND);
    request.setList(new List<String>("ecs:Start","ecs:Stop",));
        ),
        
        GetAuthorizedTargetRespDto response = managementClient.getAuthorizedTargets(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `GetAuthorizedTargetRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GetAuthorizedTargetDataDto">GetAuthorizedTargetDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "totalCount": 10,
    "list": {
      "targetType": "USER",
      "targetIdentifier": "code",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]"
    }
  }
}
```

## 数据结构


### <a id="GetAuthorizedResourceActionDto"></a> GetAuthorizedResourceActionDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| op | string | 是 | AND or OR。  | 可选枚举值：`AND`,`OR` |
| list | array | 是 | Action 列表。  |  `["ecs:Start","ecs:Stop"]` |


### <a id="GetAuthorizedTargetDataDto"></a> GetAuthorizedTargetDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 总数。  |  `10` |
| list | array | 是 | 元素列表。嵌套类型：<a href="#ResourcePermissionAssignmentDto">ResourcePermissionAssignmentDto</a>。  |  |


### <a id="ResourcePermissionAssignmentDto"></a> ResourcePermissionAssignmentDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 主体类型。  | 可选枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` |
| targetIdentifier | string | 是 | 主体唯一标志符。  |  `code` |
| actions | array | 是 | 操作列表。  |  `["ecs:Start","ecs:Stop"]` |


