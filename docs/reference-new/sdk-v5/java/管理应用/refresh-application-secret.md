# 刷新应用密钥

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

刷新应用密钥

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appId | string | 是 | - | 应用 ID。   | `6229ffaxxxxxxxxcade3e3d9` |


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
    
        RefreshApplicationSecretDto request = new RefreshApplicationSecretDto();
        request.setAppId("6229ffaxxxxxxxxcade3e3d9");
        
        RefreshApplicationSecretRespDto response = managementClient.refreshApplicationSecret(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `RefreshApplicationSecretRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RefreshApplicationSecretDataDto">RefreshApplicationSecretDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "secret": "860830c5a647xxxxxx7bd4d0dd94bf23"
  }
}
```

## 数据结构


### <a id="RefreshApplicationSecretDataDto"></a> RefreshApplicationSecretDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| secret | string | 是 | 新的应用密钥。  |  `860830c5a647xxxxxx7bd4d0dd94bf23` |


