# 获取用户 MFA 绑定信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户 MFA 绑定信息，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，默认值为 `user_id`，可选值为：
- `user_id`: Authing 用户 ID，如 `6319a1504f3xxxxf214dd5b7`
- `phone`: 用户手机号
- `email`: 用户邮箱
- `username`: 用户名
- `external_id`: 用户在外部系统的 ID，对应 Authing 用户信息的 `externalId` 字段
- `identity`: 用户的外部身份源信息，格式为 `<extIdpId>:<userIdInIdp>`，其中 `<extIdpId>` 为 Authing 身份源的 ID，`<userIdInIdp>` 为用户在外部身份源的 ID。
示例值：`62f20932716fbcc10d966ee5:ou_8bae746eac07cd2564654140d2a9ac61`。
。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username`,`identity` | `user_id` |


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
        request.setUserIdType("user_id");
        UserMfaSingleRespDto response = managementClient.getUserMfaInfo(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `UserMfaSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserMfaRespDto">UserMfaRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "totpStatus": true,
    "faceMfaStatus": true
  }
}
```

## 数据结构


### <a id="UserMfaRespDto"></a> UserMfaRespDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totpStatus | string | 是 | 是否绑定了 TOTP，可选值 enabled, disabled。  |  `true` |
| faceMfaStatus | string | 是 | 是否绑定了人脸 MFA，可选值 enabled, disabled。  |  `true` |


