# 创建顶层组织机构

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

创建组织机构，会创建一个只有一个节点的组织机构

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| organizationCode | body | string | \* |  | 组织 code。 示例值： `steamory` |
| organizationName | body | string | \* |  | 组织名称。 示例值： `蒸汽记忆` |
| description | body | string |  |  | 组织描述信息。 示例值： `组织描述信息` |
| openDepartmentId | body | string |  |  | 根节点自定义 ID。 示例值： `60b49eb83fd80adb96f26e68` |


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
  const result = await managementClient.createOrganization({
    organizationCode: 'steamory',
    organizationName: '蒸汽记忆',
    description: '组织描述信息',
    openDepartmentId: '60b49eb83fd80adb96f26e68',
 });
})();
```



## 请求响应

类型： `OrganizationSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#OrganizationDto">OrganizationDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "organizationCode": "steamory",
    "organizationName": "蒸汽记忆",
    "description": "组织描述信息",
    "departmentId": "60b49eb83fd80adb96f26e68",
    "openDepartmentId": "60b49eb83fd80adb96f26e68",
    "hasChildren": true,
    "leaderUserId": "60b49eb83fd80adb96f26e68",
    "membersCount": 150
  }
}
```

## 数据结构


### <a id="OrganizationDto"></a> OrganizationDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| organizationCode | string | \* |  | 组织 code。 示例值： `steamory`  |
  | organizationName | string | \* |  | 组织名称。 示例值： `蒸汽记忆`  |
  | description | string |  |  | 组织描述信息。 示例值： `组织描述信息`  |
  | departmentId | string | \* |  | 根节点 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
  | openDepartmentId | string |  |  | 根节点自定义 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
  | hasChildren | boolean | \* |  | 是否包含子节点。 示例值： `true`  |
  | leaderUserId | string | \* |  | 部门负责人 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
  | membersCount | number | \* |  | 部门人数。 示例值： `150`  |
  

