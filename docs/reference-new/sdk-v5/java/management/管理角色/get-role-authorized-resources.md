# 获取角色被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过权限分组内角色 code，获取角色被授权的资源列表。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | code | string  | 是 | - | 权限分组内角色的唯一标识符  | `60b49eb83fd80adb96f26e68` |
 | namespace | string  | 否 | - | 所属权限分组的 code  | `default` |
 | resourceType | string  | 否 | - | 资源类型，如 数据、API、按钮、菜单  | `DATA` |


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
    
        
         
        request.setCode("60b49eb83fd80adb96f26e68"); 
        request.setNamespace("default"); 
        request.setResourceType("DATA");
        RoleAuthorizedResourcePaginatedRespDto response = managementClient.getRoleAuthorizedResources(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `RoleAuthorizedResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#RoleAuthorizedResourcePagingDto">RoleAuthorizedResourcePagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "resourceCode": "ecs",
      "resourceType": "DATA",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]",
      "apiIdentifier": "dd8d7stf44"
    }
  }
}
```

## 数据结构


### <a id="RoleAuthorizedResourcePagingDto"></a> RoleAuthorizedResourcePagingDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数   |  |
| list | array | 是 | 数据 嵌套类型：<a href="#RoleAuthorizedResourcesRespDto">RoleAuthorizedResourcesRespDto</a>。  |  |


### <a id="RoleAuthorizedResourcesRespDto"></a> RoleAuthorizedResourcesRespDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| resourceCode | string | 是 | 资源描述符   |  `ecs` |
| resourceType | string | 是 | 资源类型   | DATA |
| actions | array | 是 | 被授权的操作列表   |  `["ecs:Start","ecs:Stop"]` |
| apiIdentifier | string | 是 | 资源对应的 API Identifier   |  `dd8d7stf44` |


