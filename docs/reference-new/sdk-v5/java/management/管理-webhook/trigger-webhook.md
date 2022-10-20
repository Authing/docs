# 手动触发 Webhook 执行

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过指定 webhookId，可选请求头和请求体进行手动触发 webhook 执行

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| webhookId | string | 是 | - | Webhook ID。   | `6229ffaxxxxxxxxcade3e3d9` |
| requestHeaders | object | 否 | - | 请求头。   | `{"eventName":"test","data":{"description":"A test from authing"}}` |
| requestBody | object | 否 | - | 请求体。   | `{"eventName":"test","data":{"description":"A test from authing"}}` |


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
    
        TriggerWebhookDto request = new TriggerWebhookDto();
        request.setWebhookId("6229ffaxxxxxxxxcade3e3d9");
        request.setRequestHeaders(new TriggerWebhookDto.setEventName("test",));
        request.setRequestBody(new TriggerWebhookDto.setEventName("test",));
        
        TriggerWebhookRespDto response = managementClient.triggerWebhook(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `TriggerWebhookRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#TriggerWebhookData">TriggerWebhookData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "response": {}
  }
}
```

## 数据结构


### <a id="TriggerWebhookData"></a> TriggerWebhookData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| response |  | 是 | 原来接口返回的 response 数据。嵌套类型：<a href="#Any">Any</a>。  |  |


### <a id="Any"></a> Any

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |


