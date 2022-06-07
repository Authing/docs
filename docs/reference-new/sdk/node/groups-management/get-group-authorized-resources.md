# 获取分组被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取分组被授权的资源列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| code  string  | 是 |  | 分组 code。 示例值： `developer` |
| namespace  string  | 否 |  | 所属权限分组的 code。 示例值： `default` |
| resourceType  string  | 否 |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |


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
  const result = await managementClient.getGroupAuthorizedResources({

    code: 'developer',

    namespace: 'default',

    resourceType: 'undefined',
 });
})();
```



## 请求响应

类型： `AuthorizedResourceListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "resourceCode": "ecs:1"
  }
}
```

## 数据结构


### <a id="AuthorizedResourceDto"></a> AuthorizedResourceDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| resourceCode | string | 是 |  | 资源标识符。 示例值： `ecs:1`  |
| resourceType | string | 否 |  | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
| actions | array | 否 |  | 被授权的资源的操作列表。   |
| apiIdentifier | string | 否 |  | 资源对应的 API Identifier。   |


