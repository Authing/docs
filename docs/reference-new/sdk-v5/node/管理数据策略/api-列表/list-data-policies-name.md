# 获取策略名称列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据策略所说数据资源 ID,获取数据资源下所有的策略名称

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resourceId | string  | 是 | - | 数据资源 Id,应用内唯一。  | `60b49eXXXXXXXXXXXXXXXXf26e68` |


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
  const result = await managementClient.listDataPoliciesName({

    resourceId: '60b49eXXXXXXXXXXXXXXXXf26e68',
 });
})();
```



## 请求响应

类型： `ListDataPoliciesNameRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DataPoliciesNameRespDto">DataPoliciesNameRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {}
}
```

## 数据结构


### <a id="DataPoliciesNameRespDto"></a> DataPoliciesNameRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| data | array | 是 | 数据策略名称列表。   |


