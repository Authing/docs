# 获取用户曾经登录过的身份源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户曾经登录过的身份源

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |


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
    
        
         
        request.setUserId("6229ffaxxxxxxxxcade3e3d9");
        UserLoggedInIdentitiesRespDto response = managementClient.getUserLoggedInIdentities(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `UserLoggedInIdentitiesRespDto`

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
    "identityId": "62299d8b866d2dab79a89dc4",
    "idpName": "微信",
    "idpNameEn": "wechat",
    "idpLogo": "https://example.com/logo.png"
  }
}
```

## 数据结构


### <a id="UserLoggedInIdentitiesDto"></a> UserLoggedInIdentitiesDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| idpName | string | 是 | 身份源名称。 示例值： `微信`  |
| idpNameEn | string | 是 | Identity provider name。 示例值： `wechat`  |
| idpLogo | string | 是 | 身份源 logo。 示例值： `https://example.com/logo.png`  |


