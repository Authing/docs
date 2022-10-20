# 获取部门信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过组织 code 以及 部门 ID 或 部门 code，获取部门信息，可以获取自定义数据。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| organizationCode | string  | 是 | - | 组织 code。  | `steamory` |
| departmentId | string  | 否 | - | 部门 ID，根部门传 `root`。departmentId 和 departmentCode 必传其一。。  | `root` |
| departmentCode | string  | 否 | - | 部门 code。departmentId 和 departmentCode 必传其一。。  | `example` |
| departmentIdType | string  | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` | `department_id` |
| withCustomData | boolean  | 否 | - | 是否获取自定义数据。  | `true` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getDepartment(array(
  
    "organizationCode" => "steamory",

    "departmentId" => "root",

    "departmentCode" => "example",

    "departmentIdType" => "department_id",

    "withCustomData" => true,

));
```


## 请求响应

类型： `DepartmentSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DepartmentDto">DepartmentDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "organizationCode": "steamory",
    "departmentId": "60b49eb83fd80adb96f26e68",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
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
    },
    "customData": {
      "icon": "https://example.com/logo"
    }
  }
}
```

## 数据结构


### <a id="DepartmentDto"></a> DepartmentDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| organizationCode | string | 是 | 组织 Code（organizationCode）。  |  `steamory` |
| departmentId | string | 是 | 部门系统 ID（为 Authing 系统自动生成，不可修改）。  |  `60b49eb83fd80adb96f26e68` |
| createdAt | string | 是 | 部门创建时间。  |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 否 | 修改时间。  |  `2022-07-03T02:20:30.000Z` |
| openDepartmentId | string | 否 | 自定义部门 ID，用于存储自定义的 ID。  |  `ou_7dab8a3d3cdccxxxxxx777c7ad535d62` |
| name | string | 是 | 部门名称。  |  `开发部` |
| leaderUserIds | array | 否 | 部门负责人 ID。  |  `["60b49eb83fd80adb96f26e68"]` |
| description | string | 否 | 部门描述。  |  `技术研发部门` |
| parentDepartmentId | string | 是 | 父部门 id。  |  `6229c4deb3e4d8a20b6021ff` |
| code | string | 否 | 部门识别码。  |  `6229c4deb3e4d8a20b6021ff` |
| membersCount | number | 是 | 部门人数（仅包含直属成员）。  |  `11` |
| hasChildren | boolean | 是 | 是否包含子部门。  |  `true` |
| isVirtualNode | boolean | 否 | 是否是虚拟部门。  |  |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#DepartmentI18nDto">DepartmentI18nDto</a>。  |  `{"name":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}}` |
| customData | object | 否 | 部门的扩展字段数据。  |  `{"icon":"https://example.com/logo"}` |


### <a id="DepartmentI18nDto"></a> DepartmentI18nDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| name |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。  |  `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}` |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。  |  `{"enabled":false,"value":"中文"}` |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。  |  `{"enabled":false,"value":"English"}` |
| zh-TW |  | 是 | 多语言的繁体中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。  |  `{"enabled":false,"value":"繁體中文"}` |
| ja-JP |  | 是 | 多语言的日语内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。  |  `{"enabled":false,"value":"日本語"}` |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。  |  |
| value | boolean | 是 | 多语言内容。  |  |


