# 获取资源详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据筛选条件，获取资源详情。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | code | string  | 是 | - | 资源唯一标志符  | `ecs` |
 | namespace | string  | 否 | - | 所属权限分组的 code  | `default` |


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
    
        
         
        request.setCode("ecs"); 
        request.setNamespace("default");
        ResourceRespDto response = managementClient.getResource(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `ResourceRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ResourceDto">ResourceDto</a> | 资源详情 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "code": "ecs",
    "description": "服务器",
    "name": "服务器",
    "type": "API",
    "actions": "[{\"name\":\"ecs:Start\",\"description\":\"启动 ECS 服务器\"},{\"name\":\"ecs:Stop\",\"description\":\"停止 ECS 服务器\"}]",
    "apiIdentifier": "https://my-awesome-api.com/api",
    "namespace": "default"
  }
}
```

## 数据结构


### <a id="ResourceDto"></a> ResourceDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 是 | 资源唯一标志符   |  `ecs` |
| description | string | 否 | 资源描述   |  `服务器` |
| name | string | 否 | 资源名称   |  `服务器` |
| type | string | 是 | 资源类型，如数据、API、按钮、菜单   | DATA |
| actions | array | 否 | 资源定义的操作类型 嵌套类型：<a href="#ResourceAction">ResourceAction</a>。数组长度限制：100。  |  `[{"name":"ecs:Start","description":"启动 ECS 服务器"},{"name":"ecs:Stop","description":"停止 ECS 服务器"}]` |
| apiIdentifier | string | 否 | API 资源的 URL 标识   |  `https://my-awesome-api.com/api` |
| namespace | string | 否 | 所属权限分组的 code   |  `default` |
| linkedToTenant | boolean | 否 | 租户应用是否关联自建应用资源   |  |


### <a id="ResourceAction"></a> ResourceAction

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | 资源操作名称   |  `ecs:Start` |
| description | string | 是 | 资源操作描述   |  `ecs:Start` |


