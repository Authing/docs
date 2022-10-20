# 批量获取组织机构详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

批量获取组织机构详情

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| organizationCodeList | string[]  | 是 | - | 组织 Code（organizationCode）列表。  | `["code1","code2"]` |
| withCustomData | boolean  | 否 | - | 是否获取自定义数据。  | `true` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_organization_batch(
  
      organization_code_list: "code1,code2",
  
      with_custom_data: true,
  
)
```



## 请求响应

类型： `OrganizationListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "organizationCode": "steamory",
    "organizationName": "蒸汽记忆",
    "description": "组织描述信息",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "departmentId": "60b49eb83fd80adb96f26e68",
    "openDepartmentId": "60b49eb83fd80adb96f26e68",
    "hasChildren": true,
    "leaderUserIds": "[\"60b49eb83fd80adb96f26e68\"]",
    "membersCount": 150,
    "i18n": {
      "organizationName": {
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


### <a id="OrganizationDto"></a> OrganizationDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| organizationCode | string | 是 | 组织 code。  |  `steamory` |
| organizationName | string | 是 | 组织名称。  |  `蒸汽记忆` |
| description | string | 否 | 组织描述信息。  |  `组织描述信息` |
| createdAt | string | 否 | 创建时间。  |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 否 | 修改时间。  |  `2022-07-03T02:20:30.000Z` |
| departmentId | string | 是 | 根节点 ID。  |  `60b49eb83fd80adb96f26e68` |
| openDepartmentId | string | 否 | 根节点自定义 ID。  |  `60b49eb83fd80adb96f26e68` |
| hasChildren | boolean | 是 | 是否包含子节点。  |  `true` |
| leaderUserIds | array | 否 | 部门负责人 ID。  |  `["60b49eb83fd80adb96f26e68"]` |
| membersCount | number | 是 | 部门人数。  |  `150` |
| isVirtualNode | boolean | 是 | 是否是虚拟部门。  |  |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#OrganizationNameI18nDto">OrganizationNameI18nDto</a>。  |  `{"organizationName":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}}` |
| customData | object | 否 | 部门的扩展字段数据。  |  `{"icon":"https://example.com/logo"}` |


### <a id="OrganizationNameI18nDto"></a> OrganizationNameI18nDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| organizationName |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。  |  `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"}}` |


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


