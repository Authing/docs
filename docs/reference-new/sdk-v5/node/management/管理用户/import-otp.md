# 导入用户的 OTP

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

导入用户的 OTP

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#ImportOtpItemDto">ImportOtpItemDto[]</a> | 是 | - | 参数列表  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.importOtp({
    list: [{
            userId: 'xxxx',
          otp: {
          secret: 'HZ2F6J3AGNAVSOTV',
        recoveryCode: 'b471-8ec0-874a-087f-bccb-cd54',
    },
      }],
 });
})();
```
 -->


## 请求响应

类型： `CommonResponseDto`

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


### <a id="ImportOtpItemDto"></a> ImportOtpItemDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| userId | string | 是 | 用户 ID   |  `xxxx` |
| otp |  | 是 | OTP 数据 嵌套类型：<a href="#ImportOtpItemDataDto">ImportOtpItemDataDto</a>。  |  |


### <a id="ImportOtpItemDataDto"></a> ImportOtpItemDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| secret | string | 是 | OTP 密钥   |  `HZ2F6J3AGNAVSOTV` |
| recoveryCode | string | 否 | OTP Recovery Code   |  `b471-8ec0-874a-087f-bccb-cd54` |


