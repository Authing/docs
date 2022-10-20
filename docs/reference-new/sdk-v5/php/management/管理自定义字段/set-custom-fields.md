# 创建/修改自定义字段定义

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建/修改用户、部门或角色自定义字段定义，如果传入的 key 不存在则创建，存在则更新。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#SetCustomFieldDto">SetCustomFieldDto[]</a> | 是 | - | 自定义字段列表。 数组长度限制：50。  |  |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->setCustomFields(array(
      "list" => array(
      array(
            "targetType" => "USER",
          "key" => "school",
          "dataType" => "ENUM",
          "label" => "学校",
          "description" => "学校",
          "encrypted" => false,
          "isUnique" => false,
          "userEditable" => false,
          "visibleInAdminConsole" => true,
          "visibleInUserCenter" => true,
          "options" => array(
      array(
            "value" => "hust",
          "label" => "华中科技大学",
      
      )
    ),
          "i18n" => array(
          "label" => array(
          "zh-CN" => array(
          "enabled" => false,
        "value" => false,
    ),
        "en-US" => array(
          "enabled" => false,
        "value" => false,
    ),
        "zh-TW" => array(
          "enabled" => false,
        "value" => false,
    ),
        "ja-JP" => array(
          "enabled" => false,
        "value" => false,
    ),
    ),
    ),
      
      )
    ),

));
```


## 请求响应

类型： `CustomFieldListRespDto`

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
    "targetType": "USER",
    "createdAt": "2022-03-17T05:23:01.567Z",
    "dataType": "ENUM",
    "key": "school",
    "label": "学校",
    "description": "学校",
    "visibleInAdminConsole": true,
    "visibleInUserCenter": true,
    "i18n": {
      "label": {
        "zh-CN": {
          "enabled": false,
          "value": "中文"
        },
        "en-US": {
          "enabled": false,
          "value": "English"
        },
        "zh-TW": {
          "enabled": false,
          "value": "繁體中文"
        }
      }
    },
    "options": "[{\"value\":\"pku\",\"label\":\"北京大学\"}]"
  }
}
```

## 数据结构


### <a id="SetCustomFieldDto"></a> SetCustomFieldDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 主体类型，目前支持用户、角色、分组和部门。  | 可选枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突，**设置之后将不能进行修改**。。  |  `school` |
| dataType | string | 否 | 数据类型，**设置之后将不能进行修改**。<br>- `STRING`: 字符串类型<br>- `NUMBER`: 数字类型<br>- `DATETIME`: 日期类型<br>- `BOOLEAN`: 布尔类型<br>- `ENUM`: 枚举值类型<br>    。  | 可选枚举值：`STRING`,`NUMBER`,`DATETIME`,`BOOLEAN`,`ENUM` |
| label | string | 否 | 显示名称。  |  `学校` |
| description | string | 否 | 详细描述信息。  |  `学校` |
| encrypted | boolean | 否 | 是否加密存储。开启后，该字段的**新增数据**将被加密，此参数一旦设置不可更改。。  |  |
| isUnique | boolean | 否 | 是否为唯一字段，开启之后，当前字段上报的值将进行唯一校验。此参数只针对。  |  |
| userEditable | boolean | 否 | 用户是否可编辑。  |  |
| visibleInAdminConsole | boolean | 否 | 是否需要在 Authing 控制台中进行显示：<br>- 如果是用户自定义字段，控制是否在用户详情展示；<br>- 如果是部门自定义字段，控制是否在部门详情中展示；<br>- 如果是角色扩展字段，控制是否在角色详情中展示。<br>    。  |  `true` |
| visibleInUserCenter | boolean | 否 | 是否在用户个人中心展示（此参数不控制 API 接口是否返回）。。  |  `true` |
| options | array | 否 | 枚举值类型选择项。嵌套类型：<a href="#CustomFieldSelectOption">CustomFieldSelectOption</a>。  |  `[{"value":"pku","label":"北京大学"}]` |
| i18n |  | 否 | 多语言显示名称。嵌套类型：<a href="#CustomFieldI18n">CustomFieldI18n</a>。  |  `{"label":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"}}}` |


### <a id="CustomFieldSelectOption"></a> CustomFieldSelectOption

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| value | string | 是 | 枚举值 value。  |  `hust` |
| label | string | 是 | 枚举值 label。  |  `华中科技大学` |


### <a id="CustomFieldI18n"></a> CustomFieldI18n

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| label |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。  |  `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"},"ja-JP":{"enabled":false,"value":"日本語"}}` |


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


### <a id="CustomFieldDto"></a> CustomFieldDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 目标对象类型：<br>- `USER`: 用户<br>- `ROLE`: 角色<br>- `GROUP`: 分组<br>- `DEPARTMENT`: 部门<br>    。  | 可选枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` |
| createdAt | string | 否 | 创建时间，只针对自定义字段有效，内置字段没有创建时间。。  |  `2022-03-17T05:23:01.567Z` |
| dataType | string | 是 | 数据类型，**设置之后将不能进行修改**。<br>- `STRING`: 字符串类型<br>- `NUMBER`: 数字类型<br>- `DATETIME`: 日期类型<br>- `BOOLEAN`: 布尔类型<br>- `ENUM`: 枚举值类型<br>    。  | 可选枚举值：`STRING`,`NUMBER`,`DATETIME`,`BOOLEAN`,`ENUM` |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突，**设置之后将不能进行修改**。。  |  `school` |
| label | string | 是 | 显示名称。  |  `学校` |
| description | string | 否 | 详细描述信息。  |  `学校` |
| encrypted | boolean | 否 | 是否加密存储。开启后，该字段的**新增数据**将被加密，此参数一旦设置不可更改。。  |  |
| isUnique | boolean | 是 | 是否为唯一字段，开启之后，当前字段上报的值将进行唯一校验。此参数只针对数据类型为字符串和数字的字段有效。。  |  |
| userEditable | boolean | 否 | 用户是否可编辑，如果是手机号、邮箱等特殊字段，用户不能直接修改，需要先通过验证码等方式进行验证。。  |  |
| visibleInAdminConsole | boolean | 是 | 是否需要在 Authing 控制台中进行显示：<br>- 如果是用户自定义字段，控制是否在用户详情展示；<br>- 如果是部门自定义字段，控制是否在部门详情中展示；<br>- 如果是角色扩展字段，控制是否在角色详情中展示。<br>    。  |  `true` |
| visibleInUserCenter | boolean | 否 | 是否在用户个人中心展示（此参数不控制 API 接口是否返回）。。  |  `true` |
| i18n |  | 否 | 多语言显示名称。嵌套类型：<a href="#CustomFieldI18n">CustomFieldI18n</a>。  |  `{"label":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"}}}` |
| options | array | 否 | 枚举值类型选择项。嵌套类型：<a href="#CustomFieldSelectOption">CustomFieldSelectOption</a>。  |  `[{"value":"pku","label":"北京大学"}]` |


### <a id="CustomFieldI18n"></a> CustomFieldI18n

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| label |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。  |  `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"},"ja-JP":{"enabled":false,"value":"日本語"}}` |


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


### <a id="CustomFieldSelectOption"></a> CustomFieldSelectOption

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| value | string | 是 | 枚举值 value。  |  `hust` |
| label | string | 是 | 枚举值 label。  |  `华中科技大学` |


