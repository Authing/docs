# 获取子部门列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取子部门列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| departmentId | string  | 是 |  | 需要获取的部门 ID。 示例值： `60b49eb83fd80adb96f26e68` |
| organizationCode | string  | 是 |  | 组织 code。 示例值： `steamory` |
| departmentIdType | string  | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` |


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
  const result = await managementClient.listChildrenDepartments({

    departmentId: '60b49eb83fd80adb96f26e68',

    organizationCode: 'steamory',

    departmentIdType: 'department_id',
 });
})();
```



## 请求响应

类型： `DepartmentPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DepartmentPagingDto">DepartmentPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "totalCount": 10,
    "list": {
      "departmentId": "60b49eb83fd80adb96f26e68",
      "openDepartmentId": "ou_7dab8a3d3cdccxxxxxx777c7ad535d62",
      "name": "开发部",
      "leaderUserIds": "[\"60b49eb83fd80adb96f26e68\"]",
      "description": "技术研发部门",
      "parentDepartmentId": "6229c4deb3e4d8a20b6021ff",
      "code": "6229c4deb3e4d8a20b6021ff",
      "membersCount": 11,
      "hasChildren": true,
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
      }
    }
  }
}
```

## 数据结构


### <a id="DepartmentPagingDto"></a> DepartmentPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | boolean | 是 | 总数。 示例值： `10`  |
| list | array | 是 | 响应数据。嵌套类型：<a href="#DepartmentDto">DepartmentDto</a>。   |


### <a id="DepartmentDto"></a> DepartmentDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| departmentId | string | 是 | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68`  |
| openDepartmentId | string | 否 | 自定义部门 ID，用于存储自定义的 ID。 示例值： `ou_7dab8a3d3cdccxxxxxx777c7ad535d62`  |
| name | string | 是 | 部门名称。 示例值： `开发部`  |
| leaderUserIds | array | 否 | 部门负责人 ID。 示例值： `["60b49eb83fd80adb96f26e68"]`  |
| description | string | 否 | 部门描述。 示例值： `技术研发部门`  |
| parentDepartmentId | string | 是 | 父部门 id。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| code | string | 否 | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| membersCount | number | 是 | 部门人数。 示例值： `11`  |
| hasChildren | boolean | 是 | 是否包含子部门。 示例值： `true`  |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#I18nDto">I18nDto</a>。 示例值： `[object Object]`  |


### <a id="I18nDto"></a> I18nDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| name |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `[object Object]`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


