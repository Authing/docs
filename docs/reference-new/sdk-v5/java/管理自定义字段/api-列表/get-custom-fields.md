# 获取用户池配置的自定义字段列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过主体类型，获取用户池配置的自定义字段列表。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetType | string  | 是 | - | 主体类型，目前支持用户、角色、分组、部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |


## 示例代码

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class ManagementClientTest {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        
         
        request.setTargetType("USER");
        CustomFieldListRespDto response = managementClient.getCustomFields(request);
        System.out.println(response);
    }
}
```



## 请求响应

类型： `CustomFieldListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "targetType": "USER",
    "createdAt": "2022-03-17T05:23:01.567Z",
    "dataType": "STRING",
    "key": "school",
    "label": "学校",
    "description": "学校",
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


### <a id="CustomFieldDto"></a> CustomFieldDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetType | string | 是 | 主体类型，目前支持用户、角色、分组和部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT`  |
| createdAt | string | 是 | 创建时间。 示例值： `2022-03-17T05:23:01.567Z`  |
| dataType | string | 是 | 数据类型。 枚举值：`STRING`,`NUMBER`,`DATETIME`,`BOOLEAN`,`SELECT`  |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突。 示例值： `school`  |
| label | string | 是 | 前端表单展示名称。 示例值： `学校`  |
| description | string | 否 | 详细描述信息。 示例值： `学校`  |
| encrypted | boolean | 否 | 是否加密存储。   |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#CustomFieldI18n">CustomFieldI18n</a>。 示例值： `{"label":{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"}}}`  |
| options | array | 否 | 枚举值类型选择项。嵌套类型：<a href="#CustomFieldSelectOption">CustomFieldSelectOption</a>。 示例值： `[{"value":"pku","label":"北京大学"}]`  |


### <a id="CustomFieldI18n"></a> CustomFieldI18n

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| label |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `{"zh-CN":{"enabled":false,"value":"中文"},"en-US":{"enabled":false,"value":"English"},"zh-TW":{"enabled":false,"value":"繁體中文"},"ja-JP":{"enabled":false,"value":"日本語"}}`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"中文"}`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"English"}`  |
| zh-TW |  | 是 | 多语言的繁体中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"繁體中文"}`  |
| ja-JP |  | 是 | 多语言的日语内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `{"enabled":false,"value":"日本語"}`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


### <a id="CustomFieldSelectOption"></a> CustomFieldSelectOption

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| value | string | 是 | 枚举值 value。 示例值： `hust`  |
| label | string | 是 | 枚举值 label。 示例值： `华中科技大学`  |


