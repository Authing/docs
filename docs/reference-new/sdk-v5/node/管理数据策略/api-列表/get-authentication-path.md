# 获取用户在某个资源路径下的权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据用户id,权限应用id,资源路径获取该资源path的权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| pathList | string[] | 是 | - | 资源路径列表。   | `["code/1/2/3"]` |
| appId | string | 是 | - | 权限应用id。   | `6301ceaad4677b9255f27478` |
| userId | string | 是 | - | 用户id。   | `6301ceaad4677b9255f27478` |


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
  const result = await managementClient.getAuthenticationPath({
    userId: '6301ceaad4677b9255f27478',
    appId: '6301ceaad4677b9255f27478',
    pathList: ["code/1/2/3"],
 });
})();
```



## 请求响应

类型： `UserPathActionResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#AuthPathRes">AuthPathRes</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "path": "1/2/3"
  }
}
```

## 数据结构


### <a id="AuthPathRes"></a> AuthPathRes

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| path | string | 是 | 路径。 示例值： `1/2/3`  |
| actionList | array | 是 | 操作列表。   |


