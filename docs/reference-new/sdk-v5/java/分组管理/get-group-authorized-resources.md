# 获取分组被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过分组 code，获取分组被授权的资源列表，可以通过资源类型、权限分组 code 筛选。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| code | string  | 是 | - | 分组 code。  | `developer` |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| resourceType | string  | 否 | - | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |  |


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
    
        
         
        request.setCode("developer"); 
        request.setNamespace("default"); 
        request.setResourceType("undefined");
        AuthorizedResourceListRespDto response = managementClient.getGroupAuthorizedResources(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `AuthorizedResourceListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "resourceCode": "ecs:1",
    "description": "服务器",
    "condition": {
      "param": "AppId",
      "operator": "StringEquals",
      "value": "1"
    },
    "resourceType": "API",
    "apiIdentifier": "/api/v1/example",
    "actions": "[\"ecs:Start\",\"ecs:Stop\"]",
    "effect": "ALLOW"
  }
}
```

## 数据结构


### <a id="AuthorizedResourceDto"></a> AuthorizedResourceDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceCode | string | 是 | 资源描述符。 示例值： `ecs:1`  |
| description | string | 否 | 资源描述信息。 示例值： `服务器`  |
| condition | array | 否 | 策略 Condition。嵌套类型：<a href="#PolicyCondition">PolicyCondition</a>。   |
| resourceType | string | 是 | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
| apiIdentifier | string | 是 | API URL。 示例值： `/api/v1/example`  |
| actions | array | 是 | 授权的操作列表。 示例值： `["ecs:Start","ecs:Stop"]`  |
| effect | string | 是 | 允许还是拒绝。 枚举值：`ALLOW`,`DENY`  |


### <a id="PolicyCondition"></a> PolicyCondition

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| param | string | 是 | Condition Param。 枚举值：`UserPoolId`,`AppId`,`RequestFrom`,`UserId`,`UserArn`,`CurrentTime`,`EpochTime`,`SourceIp`,`User`,`MultiFactorAuthPresent`,`MultiFactorAuthAge`,`UserAgent`,`Referer`,`Device`,`OS`,`Country`,`Province`,`City`,`DeviceChanged`,`DeviceUntrusted`,`ProxyUntrusted`,`LoggedInApps`,`Namespace`  |
| operator | string | 是 | Condition Operator。 枚举值：`Bool`,`DateEquals`,`DateNotEquals`,`DateLessThan`,`DateLessThanEquals`,`DateGreaterThan`,`DateGreaterThanEquals`,`IpAddress`,`NotIpAddress`,`NumericEquals`,`NumericNotEquals`,`NumericLessThan`,`NumericLessThanEquals`,`NumericGreaterThan`,`NumericGreaterThanEquals`,`StringEquals`,`StringNotEquals`,`StringEqualsIgnoreCase`,`StringNotEqualsIgnoreCase`,`StringLike`,`StringNotLike`,`ListContains`  |
| value | string | 是 | Condition Value。 示例值： `1`  |


