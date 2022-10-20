# 获取应用开启的外部身份源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取应用开启的外部身份源列表，前端可以基于此渲染外部身份源按钮。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

class Test {
    public static void main(String[] args) {
        // 设置初始化参数
        AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
        clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
        clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
        clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
        clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的登录回调地址
    
        // 初始化 AuthenticationClient
        AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);
    
        
        
        
        GetExtIdpsRespDto response = managementClient.getExtidps(request);
        System.out.println(response);
    }
}
```
 -->

## 请求响应

类型： `GetExtIdpsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | array | 外部身份源列表 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "identifier": "wechat"
  }
}
```

## 数据结构


### <a id="ExtIdpInfoDto"></a> ExtIdpInfoDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| identifier | string | 是 | 身份源连接唯一标志   |  `wechat` |
| extIdpId | string | 是 | 身份源 ID   |  |
| type | string | 是 | 身份源类型   | oidc |
| extIdpType | string | 是 | 认证类型   | social |
| bindUrl | string | 是 | 认证地址   |  |
| name | string | 是 | 身份源显示名称   |  |
| name_en | string | 否 | 身份源显示名称（英文）   |  |
| desc | string | 否 | 描述   |  |
| desc_en | string | 否 | 描述英文   |  |
| logo | string | 否 | 图标   |  |


