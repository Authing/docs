# 获取应用简单信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过应用 ID，获取应用简单信息。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
 | appId | string  | 是 | - | 应用 ID  | `6229ffaxxxxxxxxcade3e3d9` |


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
  const result = await managementClient.getApplicationSimpleInfo({

    appId: '6229ffaxxxxxxxxcade3e3d9',
 });
})();
```
 -->


## 请求响应

类型： `ApplicationSimpleInfoSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ApplicationSimpleInfoDto">ApplicationSimpleInfoDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "appId": "62eaa95fe0xxxx9a5295bf7c",
    "appIdentifier": "example",
    "appName": "示例应用",
    "appLogo": "示例应用",
    "appDescription": "示例描述信息",
    "appType": "web"
  }
}
```

## 数据结构


### <a id="ApplicationSimpleInfoDto"></a> ApplicationSimpleInfoDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID   |  `62eaa95fe0xxxx9a5295bf7c` |
| appIdentifier | string | 是 | 应用唯一标志   |  `example` |
| appName | string | 是 | 应用名称   |  `示例应用` |
| appLogo | string | 是 | 应用 Logo 链接   |  `示例应用` |
| appDescription | string | 否 | 应用描述信息   |  `示例描述信息` |
| appType | string | 是 | 应用类型   | web |
| isIntegrateApp | boolean | 是 | 是否为集成应用   |  |


