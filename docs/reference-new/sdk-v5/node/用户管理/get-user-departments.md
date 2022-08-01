# 获取用户部门列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户部门列表，支持分页，可以选择获取自定义数据、选择指定用户 ID 类型、增序或降序等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| withCustomData | boolean  | 否 | - | 是否获取自定义数据。  | `true` |
| sortBy | string  | 否 | JoinDepartmentAt | 排序依据，如 部门创建时间、加入部门时间、部门名称、部门标志符。 枚举值：`DepartmentCreatedAt`,`JoinDepartmentAt`,`DepartmentName`,`DepartmemtCode` | `JoinDepartmentAt` |
| orderBy | string  | 否 | Desc | 增序或降序。 枚举值：`Asc`,`Desc` | `Desc` |


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
  const result = await managementClient.getUserDepartments({

    userId: '6229ffaxxxxxxxxcade3e3d9',

    userIdType: 'user_id',

    page: 1,

    limit: 10,

    withCustomData: true,

    sortBy: 'JoinDepartmentAt',

    orderBy: 'Desc',
 });
})();
```



## 请求响应

类型： `UserDepartmentPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserDepartmentPagingDto">UserDepartmentPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "organizationCode": "steamory",
      "departmentId": "60b49eb83fd80adb96f26e68",
      "createdAt": "2022-07-03T02:20:30.000Z",
      "name": "dd8d7stf44",
      "description": "dd8d7stf44",
      "openDepartmentId": "ou_7dab8a3d3cdccxxxxxx777c7ad535d62",
      "isLeader": true,
      "code": "6229c4deb3e4d8a20b6021ff",
      "isMainDepartment": true,
      "joinedAt": "2022-07-03T02:20:30.000Z",
      "i18n": {
        "name": {
          "zh-CN": {
            "enabled": false,
            "value": "中文"
          },
          "en-US": {
            "enabled": false,
            "value": "English"
          }
        }
      },
      "customData": {
        "icon": "https://example.com/logo"
      }
    }
  }
}
```

## 数据结构


### <a id="UserDepartmentPagingDto"></a> UserDepartmentPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#UserDepartmentRespDto">UserDepartmentRespDto</a>。   |


### <a id="UserDepartmentRespDto"></a> UserDepartmentRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| organizationCode | string | 是 | 组织 Code（organizationCode）。 示例值： `steamory`  |
| departmentId | string | 是 | 部门 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| createdAt | string | 是 | 部门创建时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| name | string | 是 | 部门名称。 示例值： `dd8d7stf44`  |
| description | string | 是 | 部门描述。 示例值： `dd8d7stf44`  |
| openDepartmentId | string | 否 | 自定义部门 ID，用于存储自定义的 ID。 示例值： `ou_7dab8a3d3cdccxxxxxx777c7ad535d62`  |
| isLeader | boolean | 是 | 是否是部门 Leader。 示例值： `true`  |
| code | string | 是 | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| isMainDepartment | boolean | 是 | 是否是主部门。 示例值： `true`  |
| joinedAt | string | 是 | 加入部门时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| isVirtualNode | boolean | 是 | 是否是虚拟部门。   |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#I18nDto">I18nDto</a>。 示例值： `{"name":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}}`  |
| customData | object | 否 | 部门的扩展字段数据。 示例值： `{"icon":"https://example.com/logo"}`  |


### <a id="I18nDto"></a> I18nDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| name |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"中文"}`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"English"}`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


