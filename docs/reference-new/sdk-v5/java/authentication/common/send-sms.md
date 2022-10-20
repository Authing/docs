# 发送短信

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

发送短信时必须指定短信 Channel，每个手机号同一 Channel 在一分钟内只能发送一次。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| channel | string | 是 | - | 短信通道，指定发送此短信的目的，如 CHANNEL_LOGIN 用于登录、CHANNEL_REGISTER 用于注册。。  枚举值：`CHANNEL_LOGIN`,`CHANNEL_REGISTER`,`CHANNEL_RESET_PASSWORD`,`CHANNEL_BIND_PHONE`,`CHANNEL_UNBIND_PHONE`,`CHANNEL_BIND_MFA`,`CHANNEL_VERIFY_MFA`,`CHANNEL_UNBIND_MFA`,`CHANNEL_COMPLETE_PHONE`,`CHANNEL_IDENTITY_VERIFICATION`,`CHANNEL_DELETE_ACCOUNT` | `CHANNEL_LOGIN` |
| phoneNumber | string | 是 | - | 手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。。   | `188xxxx8888` |
| phoneCountryCode | string | 否 | - | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。   | `+86` |


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
    
        SendSMSDto request = new SendSMSDto();
        request.setPhoneNumber("188xxxx8888");
        request.setChannel(SendSMSDto.channel.CHANNEL_LOGIN);
        request.setPhoneCountryCode("+86");
        
        SendSMSRespDto response = managementClient.sendSms(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `SendSMSRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c"
}
```

## 数据结构


