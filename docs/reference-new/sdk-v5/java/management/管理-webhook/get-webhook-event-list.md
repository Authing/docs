# 获取 Webhook 事件列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

返回事件列表和分类列表

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


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
    
        
        
        WebhookEventListRespDto response = managementClient.getWebhookEventList(request);
        System.out.println(response);
    }
}
```
 -->


## 请求响应

类型： `WebhookEventListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#WebhookEventListData">WebhookEventListData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "categories": {
      "name": "用户",
      "nameEn": "User",
      "value": "user"
    },
    "events": {
      "name": "创建用户",
      "nameEn": "Create User",
      "value": "user:created",
      "category": "user"
    }
  }
}
```

## 数据结构


### <a id="WebhookEventListData"></a> WebhookEventListData

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| categories | array | 是 | 分类列表 嵌套类型：<a href="#WebhookCategoryDto">WebhookCategoryDto</a>。  |  |
| events | array | 是 | 事件列表 嵌套类型：<a href="#WebhookEventDto">WebhookEventDto</a>。  |  |


### <a id="WebhookCategoryDto"></a> WebhookCategoryDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | Webhook 类型名称   |  `用户` |
| nameEn | string | 是 | Webhook 类型英文名称   |  `User` |
| value | string | 是 | Webhook 类型   |  `user` |


### <a id="WebhookEventDto"></a> WebhookEventDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | Webhook 名称   |  `创建用户` |
| nameEn | string | 是 | Webhook 英文名称   |  `Create User` |
| value | string | 是 | Webhook 事件   |  `user:created` |
| category | string | 是 | Webhook 事件分类   |  `user` |


