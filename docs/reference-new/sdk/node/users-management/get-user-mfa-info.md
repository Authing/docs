# 获取用户 MFA 绑定信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取用户 MFA 绑定信息

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| userId | query | string  | \* |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |


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
  const result = await managementClient.getUserMfaInfo({

    userId: '6229ffaxxxxxxxxcade3e3d9',
 });
})();
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

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "totpStatus": true,
    "faceMfaStatus": true
  }
}
```

## 数据结构


### <a id="UserMfaRespDto"></a> UserMfaRespDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totpStatus | string | \* |  | 是否绑定了 TOTP，可选值 enabled, disabled。 示例值： `true`  |
  | faceMfaStatus | string | \* |  | 是否绑定了人脸 MFA，可选值 enabled, disabled。 示例值： `true`  |
  

