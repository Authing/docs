# 获取用户、分组、角色、组织机构的自定义字段值

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过筛选条件，获取用户、分组、角色、组织机构的自定义字段值。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetType | string  | 是 | - | 目标对象类型：
- `USER`: 用户
- `ROLE`: 角色
- `GROUP`: 分组
- `DEPARTMENT`: 部门
    。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |
| targetIdentifier | string  | 是 | - | 目标对象的唯一标志符：
- 如果是用户，为用户的 ID，如 `6343b98b7cfxxx9366e9b7c`
- 如果是角色，为角色的 code，如 `admin`
- 如果是分组，为分组的 code，如 `developer`
- 如果是部门，为部门的 ID，如 `6343bafc019xxxx889206c4c`
        。  | `userId1` |
| namespace | string  | 否 | - | 所属权限分组的 code，当 targetType 为角色的时候需要填写，否则可以忽略。  | `default` |


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
  const result = await managementClient.getCustomData({

    targetType: 'USER',

    targetIdentifier: 'userId1',

    namespace: 'default',
 });
})();
```



## 请求响应

类型： `GetCustomDataRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | object | 具体的自定义数据值 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "age": 18,
    "school": "pku"
  }
}
```

## 数据结构


