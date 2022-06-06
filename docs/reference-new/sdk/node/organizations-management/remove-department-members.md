# 部门下删除成员

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

部门下删除成员

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| departmentId | body | string | \* |  | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68` |
| organizationCode | body | string | \* |  | 组织 code。 示例值： `steamory` |
| departmentIdType | body | string |  | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` |
| userIds | body | array | \* |  | 用户 ID 列表。 示例值： `["623c20b2a062aaaaf41b17da"]` |


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
  const result = await managementClient.removeDepartmentMembers({
    departmentId: '60b49eb83fd80adb96f26e68',
    organizationCode: 'steamory',
    departmentIdType: 'department_id',
    userIds: '["623c20b2a062aaaaf41b17da"]',
 });
})();
```



## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| success | boolean | \* |  | 操作是否成功。 示例值： `true`  |
  

