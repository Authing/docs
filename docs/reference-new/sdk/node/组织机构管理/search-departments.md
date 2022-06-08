# 搜索部门

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

搜索部门

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| organizationCode | string | 是 |  | 组织 code。 示例值： `steamory` |
| keywords | string | 是 |  | 搜索关键词。 示例值： `Authing` |


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
  const result = await managementClient.searchDepartments({
    organizationCode: 'steamory',
    keywords: 'Authing',
 });
})();
```



## 请求响应

类型： `DepartmentListRespDto`

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
    "departmentId": "60b49eb83fd80adb96f26e68",
    "openDepartmentId": "ou_7dab8a3d3cdccxxxxxx777c7ad535d62",
    "name": "开发部",
    "description": "技术研发部门",
    "parentDepartmentId": "6229c4deb3e4d8a20b6021ff",
    "code": "6229c4deb3e4d8a20b6021ff",
    "leaderUserId": "60b49eb83fd80adb96f26e68",
    "membersCount": 11,
    "hasChildren": true
  }
}
```

## 数据结构


### <a id="DepartmentDto"></a> DepartmentDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| departmentId | string | 是 |  | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68`  |
| openDepartmentId | string | 否 |  | 自定义部门 ID，用于存储自定义的 ID。 示例值： `ou_7dab8a3d3cdccxxxxxx777c7ad535d62`  |
| name | string | 是 |  | 部门名称。 示例值： `开发部`  |
| description | string | 否 |  | 部门描述。 示例值： `技术研发部门`  |
| parentDepartmentId | string | 是 |  | 父部门 id。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| code | string | 否 |  | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| leaderUserId | string | 否 |  | 部门负责人 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| membersCount | number | 是 |  | 部门人数。 示例值： `11`  |
| hasChildren | boolean | 是 |  | 是否包含子部门。 示例值： `true`  |


