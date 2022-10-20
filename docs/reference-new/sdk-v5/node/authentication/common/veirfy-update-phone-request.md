# 发起修改手机号的验证请求

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

终端用户自主修改手机号时，需要提供相应的验证手段。此接口用于验证用户的修改手机号请求是否合法。当前支持通过**短信验证码**的方式进行验证，你需要先调用发送短信接口发送对应的短信验证码。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| phonePassCodePayload | <a href="#UpdatePhoneByPhonePassCodeDto">UpdatePhoneByPhonePassCodeDto</a> | 是 | - | 使用手机号验证码方式验证的数据。   |  |
| verifyMethod | string | 是 | - | 修改手机号的验证方式：
- `PHONE_PASSCODE`: 使用短信验证码的方式进行验证，当前仅支持这一种方式。
    。  枚举值：`PHONE_PASSCODE` |  |


## 示例代码

```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.veirfyUpdatePhoneRequest({
    verifyMethod: 'undefined',
    phonePassCodePayload: {
          newPhoneNumber: '188xxxx8888',
        newPhonePassCode: '123456',
        newPhoneCountryCode: '+86',
        oldPhoneNumber: '177xxxx7777',
        oldPhonePassCode: '123456',
        oldPhoneCountryCode: '+86',
    },
 });
})();
```



## 请求响应

类型： `VerifyUpdatePhoneRequestRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#VerifyUpdatePhoneRequestData">VerifyUpdatePhoneRequestData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {}
}
```

## 数据结构


### <a id="UpdatePhoneByPhonePassCodeDto"></a> UpdatePhoneByPhonePassCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| newPhoneNumber | string | 是 | 新手机号码，不带去号。如果是国外手机号，请在 newPhoneCountryCode 参数中指定区号。。  |  `188xxxx8888` |
| newPhonePassCode | string | 是 | 验证码。  |  `123456` |
| newPhoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。  |  `+86` |
| oldPhoneNumber | string | 否 | 旧手机号码，不带去号。如果是国外手机号，请在 oldPhoneCountryCode 参数中指定区号。如果用户池开启了修改手机号需要验证之前的手机号，此参数必填。。  |  `177xxxx7777` |
| oldPhonePassCode | string | 否 | 旧手机号的验证码，如果用户池开启了修改手机号需要验证之前的手机号，此参数必填。  |  `123456` |
| oldPhoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。  |  `+86` |


### <a id="VerifyUpdatePhoneRequestData"></a> VerifyUpdatePhoneRequestData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| updatePhoneToken | string | 是 | 用于修改当前手机号 token，你需要使用此 token 请求**修改手机号**的接口。。  |  |
| tokenExpiresIn | number | 是 | 过期时间。  |  |


