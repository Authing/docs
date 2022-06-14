# 获取用户曾经登录过的应用

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取用户曾经登录过的应用

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |


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
  const result = await managementClient.getUserLoggedinApps({

    userId: '6229ffaxxxxxxxxcade3e3d9',
 });
})();
```



## 请求响应

类型： `UserLoggedInAppsListRespDto`

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
    "appId": "app1",
    "appName": "App Name",
    "appLogo": "https://example.com/logo.png",
    "appLoginUrl": "https://example.com/login"
  }
}
```

## 数据结构


### <a id="UserLoggedInAppsDto"></a> UserLoggedInAppsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | App ID。 示例值： `app1`  |
| appName | string | 是 | App 名称。 示例值： `App Name`  |
| appLogo | string | 是 | App Logo。 示例值： `https://example.com/logo.png`  |
| appLoginUrl | string | 是 | App 登录地址。 示例值： `https://example.com/login`  |


